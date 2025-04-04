# pip install transformers torch sacremoses

##
##
##
##

## YOU NEED TO CITE ALL THE MODELS IF APPLICABLE

##
##
##
##

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import sys
import re
import json
import os

VALID_LANGS = {"en", "es", "fr", "de", "pt"}
MODEL_DIR = "models"

# Mapping of (source_lang, target_lang) -> model folder
MODEL_MAP = {
    # English (en) as source
    ("en", "es"): "en-es",
    ("en", "fr"): "en-fr",
    ("en", "de"): "en-de",
    ("en", "pt"): "en-pt",
    
    # Spanish (es) as source
    ("es", "en"): "es-en",
    ("es", "fr"): "es-fr",
    ("es", "de"): "es-de",
    ("es", "pt"): "es-pt",

    # French (fr) as source
    ("fr", "en"): "fr-en",
    ("fr", "es"): "fr-es",
    ("fr", "de"): "fr-de",
    ("fr", "pt"): "fr-pt",

    # German (de) as source
    ("de", "en"): "de-en",
    ("de", "es"): "de-es",
    ("de", "fr"): "de-fr",
    ("de", "pt"): "de-pt",

    # Portuguese (pt) as source
    ("pt", "en"): "pt-en",
    ("pt", "es"): "pt-es",
    ("pt", "fr"): "pt-fr",
    ("pt", "de"): "pt-de",
}

text = sys.argv[1]
source_lang = sys.argv[2]
target_lang = sys.argv[3]

if source_lang not in VALID_LANGS or target_lang not in VALID_LANGS:
    print(json.dumps({"error": "Invalid source or target language. Allowed values: en, es, fr, de, pt"}))
    sys.exit(1)

if source_lang == target_lang:
    print(json.dumps({"error": "Source and target languages must be different"}))
    sys.exit(1)

model_folder = MODEL_MAP.get((source_lang, target_lang))

if not model_folder:
    print(json.dumps({"error": f"Model for {source_lang} to {target_lang} not available."}))
    sys.exit(1)

model_path = os.path.join(MODEL_DIR, model_folder)

if not os.path.exists(model_path):
    print(json.dumps({"error": f"Model for {source_lang} to {target_lang} not available."}))
    sys.exit(1)

tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSeq2SeqLM.from_pretrained(model_path)

def preserve_html_tags(text):
    tag_re = r'(<.*?>)|([^<]+)'
    parts = re.findall(tag_re, text)

    return parts

def translate_text_with_html(text, model, tokenizer):
    parts = preserve_html_tags(text)
    translated_parts = []

    for part in parts:
        tag, content = part
        if tag:
            translated_parts.append(tag)
        elif content:
            inputs = tokenizer(content, return_tensors="pt", padding=True, truncation=True)
            translated_tokens = model.generate(**inputs)
            translated_text = tokenizer.decode(translated_tokens[0], skip_special_tokens=True)
            translated_parts.append(translated_text)
    
    return ''.join(translated_parts)

translated_text = translate_text_with_html(text, model, tokenizer)

print(json.dumps({"translatedText": translated_text}))