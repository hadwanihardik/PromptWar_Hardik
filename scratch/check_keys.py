
import re

with open('assets/js/i18n.js', 'r') as f:
    content = f.read()

languages = ['en', 'hi', 'gu', 'mr']
keys_by_lang = {}

for lang in languages:
    # Match the block for each language
    pattern = rf'{lang}: \{{(.*?)\}},'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        block = match.group(1)
        # Match keys at the start of lines
        keys = re.findall(r'^\s*(\w+):', block, re.MULTILINE)
        keys_by_lang[lang] = set(keys)

en_keys = keys_by_lang.get('en', set())
for lang in languages:
    if lang == 'en': continue
    current_keys = keys_by_lang.get(lang, set())
    missing = en_keys - current_keys
    if missing:
        print(f"Missing keys in {lang}: {sorted(list(missing))}")
    
    extra = current_keys - en_keys
    if extra:
        print(f"Extra keys in {lang}: {sorted(list(extra))}")
