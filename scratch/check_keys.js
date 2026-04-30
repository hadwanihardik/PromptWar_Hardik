
const fs = require('fs');
const content = fs.readFileSync('assets/js/i18n.js', 'utf8');

// This is a bit hacky but should work for this specific file structure
const languages = ['en', 'hi', 'gu', 'mr'];
const keysByLang = {};

languages.forEach(lang => {
  const regex = new RegExp(`${lang}: \\{([\\s\\S]*?)\\},`, 'g');
  const match = regex.exec(content);
  if (match) {
    const block = match[1];
    const keys = block.match(/^\s*(\w+):/gm).map(k => k.trim().replace(':', ''));
    keysByLang[lang] = keys;
  }
});

const enKeys = keysByLang['en'];
languages.forEach(lang => {
  if (lang === 'en') return;
  const currentKeys = keysByLang[lang];
  const missing = enKeys.filter(k => !currentKeys.includes(k));
  if (missing.length > 0) {
    console.log(`Missing keys in ${lang}:`, missing);
  }
});
