import json
import re
import urllib.request
import urllib.parse
import time

def translate(text, target_lang):
    if not text: return text
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl={target_lang}&dt=t&q={urllib.parse.quote(text)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode('utf-8'))
        return "".join([d[0] for d in data[0]])
    except Exception as e:
        print(f"Error translating {text} to {target_lang}: {e}")
        return text

# Read members.js
with open('assets/js/data/members.js', 'r') as f:
    content = f.read()

# Extract JSON array
match = re.search(r'const MEMBERS_DATA = (\[.*\]);', content, re.DOTALL)
if not match:
    print("Could not find MEMBERS_DATA")
    exit(1)

members = json.loads(match.group(1))

# Find unique constituencies
constituencies = set(m.get('constituency') for m in members if m.get('constituency'))
print(f"Found {len(constituencies)} unique constituencies")

# Translate constituencies
translations = {}
for c in constituencies:
    translations[c] = {
        'hi': translate(c, 'hi'),
        'gu': translate(c, 'gu'),
        'mr': translate(c, 'mr')
    }
    print(f"Translated {c}: {translations[c]}")
    time.sleep(0.1) # Be nice to the API

# Update members
for m in members:
    c = m.get('constituency')
    if c and c in translations:
        m['constituency_hi'] = translations[c]['hi']
        m['constituency_gu'] = translations[c]['gu']
        m['constituency_mr'] = translations[c]['mr']

# Write back
new_content = content[:match.start(1)] + json.dumps(members, indent=2) + content[match.end(1):]
with open('assets/js/data/members.js', 'w') as f:
    f.write(new_content)

print("Done updating members.js")
