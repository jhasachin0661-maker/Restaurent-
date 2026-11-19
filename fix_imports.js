// fix_imports.js
// This script scans the project for CommonJS `require()` statements and `module.exports`/`module =` assignments,
// and rewrites them to modern ES module syntax. It also converts `// @ts-ignore` to `// @ts-expect-error`.
// Run with: node fix_imports.js
import fs from 'fs';
import path from 'path';

const exts = ['.tsx', '.ts', '.js', '.jsx'];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip node_modules and .next
      if (['node_modules', '.next', 'dist', 'out'].includes(entry.name)) continue;
      walk(full);
    } else if (exts.includes(path.extname(entry.name))) {
      processFile(full);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Replace require statements
  // const X = require('module');
  content = content.replace(/const\s+(\w+)\s*=\s*require\(['"]([^'\"]+)['"]\);/g, (m, name, mod) => {
    return `import ${name} from '${mod}';`;
  });
  // const {a, b} = require('module');
  content = content.replace(/const\s+\{([^}]+)\}\s*=\s*require\(['"]([^'\"]+)['"]\);/g, (m, names, mod) => {
    return `import {${names}} from '${mod}';`;
  });

  // 2. Remove module.exports or export default replacement
  // module.exports = X;
  content = content.replace(/module\.exports\s*=\s*(.+);/g, (m, val) => {
    return `export default ${val.trim()};`;
  });
  // export named if assignment to exports.prop
  content = content.replace(/exports\.(\w+)\s*=\s*(.+);/g, (m, name, val) => {
    return `export const ${name} = ${val.trim()};`;
  });

  // 3. Remove direct assignments to module variable
  content = content.replace(/module\s*=\s*[^;]+;/g, '');

  // 4. Convert // @ts-ignore to // @ts-expect-error
  content = content.replace(/\/\/\s*@ts-ignore/g, '// @ts-expect-error');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

walk(path.resolve(__dirname, 'src'));
console.log('Import/TS-ignore fix completed');
