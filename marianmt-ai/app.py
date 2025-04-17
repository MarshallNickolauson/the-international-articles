from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import subprocess
import re
import os
import signal
import sys
import multiprocessing

'''
@InProceedings{TiedemannThottingal:EAMT2020,
    author = {J{\"o}rg Tiedemann and Santhosh Thottingal},
    title = {{OPUS-MT} — {B}uilding open translation services for the {W}orld},
    booktitle = {Proceedings of the 22nd Annual Conferenec of the European Association for Machine Translation (EAMT)},
    year = {2020},
    address = {Lisbon, Portugal}
}

@misc{deepseekai2024deepseekv3technicalreport,
    title={DeepSeek-V3 Technical Report}, 
    author={DeepSeek-AI},
    year={2024},
    eprint={2412.19437},
    archivePrefix={arXiv},
    primaryClass={cs.CL},
    url={https://arxiv.org/abs/2412.19437}, 
}
'''

app = Flask(__name__)
CORS(app)

VALID_LANGS = {"en", "es", "fr", "de", "pt"}
MODEL_DIR = "models"

MODEL_MAP = {
    ("en", "es"): "en-es", ("en", "fr"): "en-fr", ("en", "de"): "en-de", ("en", "pt"): "en-pt",
    ("es", "en"): "es-en", ("es", "fr"): "es-fr", ("es", "de"): "es-de", ("es", "pt"): "es-pt",
    ("fr", "en"): "fr-en", ("fr", "es"): "fr-es", ("fr", "de"): "fr-de", ("fr", "pt"): "fr-pt",
    ("de", "en"): "de-en", ("de", "es"): "de-es", ("de", "fr"): "de-fr", ("de", "pt"): "de-pt",
    ("pt", "en"): "pt-en", ("pt", "es"): "pt-es", ("pt", "fr"): "pt-fr", ("pt", "de"): "pt-de",
}

# Map of requestId -> process
active_processes = {}

def preserve_html_tags(text):
    tag_re = r'(<.*?>)|([^<]+)'
    return re.findall(tag_re, text)

def translate_text_with_html(text, model_path):
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_path)

    parts = preserve_html_tags(text)
    translated_parts = []

    for tag, content in parts:
        if tag:
            translated_parts.append(tag)
        elif content:
            inputs = tokenizer(content, return_tensors="pt", padding=True, truncation=True)
            outputs = model.generate(**inputs)
            translated = tokenizer.decode(outputs[0], skip_special_tokens=True)
            translated_parts.append(translated)

    return ''.join(translated_parts)

def translation_worker(pipe, text, model_path):
    try:
        result = translate_text_with_html(text, model_path)
        pipe.send(result)
    except Exception as e:
        pipe.send(f"ERROR: {str(e)}")
    finally:
        pipe.close()

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()

    text = data.get('text')
    source_lang = data.get('sourceLang')
    target_lang = data.get('targetLang')
    request_id = data.get('requestId')

    if not all([text, source_lang, target_lang, request_id]):
        return jsonify({'error': "Missing required fields: 'text', 'sourceLang', 'targetLang', 'requestId'"}), 400

    if source_lang == target_lang:
        return jsonify({'error': "Source and target languages must be different"}), 400

    if source_lang not in VALID_LANGS or target_lang not in VALID_LANGS:
        return jsonify({'error': "Invalid language"}), 400

    if request_id in active_processes:
        return jsonify({'error': 'Translation already running for this requestId'}), 400

    model_folder = MODEL_MAP.get((source_lang, target_lang))
    if not model_folder:
        return jsonify({'error': f"No model available for {source_lang} -> {target_lang}"}), 400

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(BASE_DIR, MODEL_DIR, model_folder)
    
    if not os.path.exists(model_path):
        return jsonify({'error': f"Model path not found: {model_path}"}), 500

    parent_conn, child_conn = multiprocessing.Pipe()
    process = multiprocessing.Process(target=translation_worker, args=(child_conn, text, model_path))
    process.start()

    active_processes[request_id] = process

    process.join() # wait to finish
    
    active_processes.pop(request_id, None)  # safely remove
        
    if parent_conn.poll():
        result = parent_conn.recv()
        if result.startswith("ERROR:"):
            return jsonify({'error': result[6:]}), 500
        else:
            return jsonify({'translatedText': result})

    return jsonify({'error': 'No response from translation process'}), 500

@app.route('/translate/abort', methods=['POST'])
def abort():
    data = request.get_json()
    request_id = data.get('requestId')

    if not request_id:
        return jsonify({'error': 'Missing requestId'}), 400

    proc = active_processes.get(request_id)
    if not proc:
        return jsonify({'error': 'No active process for this requestId'}), 404

    proc.terminate()
    proc.join()
    active_processes.pop(request_id, None)  # safely remove
    return jsonify({'message': 'Translation process aborted successfully'}), 200

if __name__ == '__main__':
    multiprocessing.set_start_method('spawn')  # required for some OSes
    app.run(debug=True, host='0.0.0.0', port=9000)