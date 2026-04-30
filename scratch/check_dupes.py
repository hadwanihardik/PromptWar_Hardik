
import re

with open('/Users/hardikhadwani/Documents/Source Codes/PromptWar/PromptWar_Hardik/assets/js/i18n.js', 'r') as f:
    content = f.read()

# Find all blocks like 'en: { ... }'
blocks = re.findall(r'([a-z]{2}): \{([\s\S]*?)\}', content)

for lang, body in blocks:
    # Find keys like 'key:' at the start of a line (after whitespace)
    keys = re.findall(r'^\s+([a-z0-9_]+):', body, re.MULTILINE)
    seen = set()
    dups = []
    for k in keys:
        if k in seen:
            dups.append(k)
        seen.add(k)
    
    if dups:
        print(f"Duplicates in {lang}: {dups}")
    else:
        print(f"{lang} is clean")
