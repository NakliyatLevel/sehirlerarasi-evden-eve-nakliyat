const fs = require('fs');
const path = require('path');

const hbDir = path.join(__dirname, '..', 'hb');
const files = fs.readdirSync(hbDir).filter(f => f.endsWith('.html'));

let fixed = 0;

for (const file of files) {
  const filePath = path.join(hbDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const originalContent = content;
  
  // H1 başlığında "Evden Eve Nakliyat" tekrarını kaldır
  content = content.replace(
    /<h1>([^<]*?)Evden Eve Nakliyat\s+Evden Eve Nakliyat<\/h1>/g,
    '<h1>$1Evden Eve Nakliyat</h1>'
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Düzeltildi: ${file}`);
    fixed++;
  }
}

console.log(`\n✓ Toplam ${fixed} dosya düzeltildi`);
