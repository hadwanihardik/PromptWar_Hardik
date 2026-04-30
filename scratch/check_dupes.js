
const fs = require('fs');
const content = fs.readFileSync('/Users/hardikhadwani/Documents/Source Codes/PromptWar/PromptWar_Hardik/assets/js/i18n.js', 'utf8');

// Use a simple regex to find all keys in each block
const blocks = content.match(/[a-z]{2}: \{[\s\S]*?\}/g);

if (!blocks) {
    console.log("No blocks found");
    process.exit(0);
}

blocks.forEach(block => {
    const lang = block.substring(0, 2);
    const keys = block.match(/^\s+([a-z0-9_]+):/gm).map(k => k.trim().replace(':', ''));
    const seen = new Set();
    const dups = [];
    keys.forEach(k => {
        if (seen.has(k)) dups.push(k);
        seen.add(k);
    });
    if (dups.length > 0) {
        console.log(`Duplicates in ${lang}:`, dups);
    } else {
        console.log(`${lang} is clean`);
    }
});
