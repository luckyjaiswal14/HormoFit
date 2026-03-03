const fs = require('fs');
let content = fs.readFileSync('lib/db.ts', 'utf-8');
content = content.replace(/global as any\)\.mongoose/g, '(globalThis as any).mongoose');
fs.writeFileSync('lib/db.ts', JSON.stringify(content).replace(/\\n/gm, '\n').replace(/\n\s*let cached =  \(global\s+as\s+\{\s*mongoose\?:\s*any\s*\}\)\s*\.\s*mongoose;/, 'let cached = (global as any).mongoose;').replace(/\n\s*cached = \(global\s+as\s+\{\s*mongoose\?:\s*any\s*\}\)\s*\.\s*mongoose/, 'cached = (global as any).mongoose'));
