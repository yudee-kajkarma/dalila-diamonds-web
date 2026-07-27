import json
import os
import sys
from deep_translator import GoogleTranslator

# Sections to translate
sections = ['about', 's2s', 'ds4u', 'contact', 'sud', 'dk', 'auth']

# Paths
base_dir = r"C:\Users\shinj\dalila-diamonds-web\src\dictionaries"
en_path = os.path.join(base_dir, "en.json")
fr_path = os.path.join(base_dir, "fr.json")
es_path = os.path.join(base_dir, "es.json")
nl_path = os.path.join(base_dir, "nl.json")
it_path = os.path.join(base_dir, "it.json")

def process_file(target_path, target_lang):
    with open(en_path, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    with open(target_path, 'r', encoding='utf-8') as f:
        target_data = json.load(f)
    
    translator = GoogleTranslator(source='en', target=target_lang)
    
    for section in sections:
        print(f"Translating {section} for {target_lang}...")
        if section in en_data:
            target_data[section] = {}
            for key, val in en_data[section].items():
                if isinstance(val, dict):
                    target_data[section][key] = {}
                    for k, v in val.items():
                        target_data[section][key][k] = translator.translate(v)
                else:
                    target_data[section][key] = translator.translate(val)
                    
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(target_data, f, ensure_ascii=False, indent=2)

print("Starting translations...")
try:
    process_file(fr_path, 'fr')
    print("French translation done.")
    process_file(es_path, 'es')
    print("Spanish translation done.")
    process_file(nl_path, 'nl')
    print("Dutch translation done.")
    process_file(it_path, 'it')
    print("Italian translation done.")
except Exception as e:
    print(f"Error: {e}")
