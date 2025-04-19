import os
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Define the MODEL_MAP as per your updated structure
MODEL_MAP = {
    # English (en) as source
    ("en", "es"): "Helsinki-NLP/opus-mt-en-es",
    ("en", "fr"): "Helsinki-NLP/opus-mt-en-fr",
    ("en", "de"): "Helsinki-NLP/opus-mt-en-de",
    
    # Spanish (es) as source
    ("es", "en"): "Helsinki-NLP/opus-mt-es-en",
    ("es", "fr"): "Helsinki-NLP/opus-mt-es-fr",
    ("es", "de"): "Helsinki-NLP/opus-mt-es-de",

    # French (fr) as source
    ("fr", "en"): "Helsinki-NLP/opus-mt-fr-en",
    ("fr", "es"): "Helsinki-NLP/opus-mt-fr-es",
    ("fr", "de"): "Helsinki-NLP/opus-mt-fr-de",

    # German (de) as source
    ("de", "en"): "Helsinki-NLP/opus-mt-de-en",
    ("de", "es"): "Helsinki-NLP/opus-mt-de-es",
    ("de", "fr"): "Helsinki-NLP/opus-mt-de-fr",

    # Portuguese (pt) as source
}

# Define the folder to store models
MODEL_DIR = "/app/models"

# Create the directory if it doesn't exist
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

def download_and_save_model(model_name, model_path):
    """
    Download and save model and tokenizer to the specified directory
    """
    print(f"Downloading {model_name}...")
    
    # Download and save the model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

    # Save the model and tokenizer to the specified directory
    tokenizer.save_pretrained(model_path)
    model.save_pretrained(model_path)

    print(f"Model {model_name} saved to {model_path}")

# Loop through the models in MODEL_MAP and download each
for lang_pair, model_name in MODEL_MAP.items():
    # Construct a folder path based on the language pair
    model_folder = os.path.join(MODEL_DIR, f"{lang_pair[0]}-{lang_pair[1]}")

    # Download and save the model locally
    download_and_save_model(model_name, model_folder)

print("All models downloaded and saved.")