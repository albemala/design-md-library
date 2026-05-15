import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv();
addFormats(ajv);

function checkNoExternalLinks(htmlFile) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  // allowed external domains
  const sanitized = content
    //  SVG/XML namespaces
    .replace(/xmlns=['"]http:\/\/www\.w3\.org\/2000\/svg['"]/g, '')
    .replace(/xmlns=['"]http:\/\/www\.w3\.org\/1999\/xhtml['"]/g, '')
    // Unsplash images
    .replace(/https:\/\/images\.unsplash\.com\/?/g, '')
    // Google Fonts
    .replace(/https:\/\/fonts\.googleapis\.com\/?/g, '')
    .replace(/https:\/\/fonts\.gstatic\.com\/?/g, '');

  return !sanitized.includes('http://') && !sanitized.includes('https://');
}

function main() {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const designMdDir = path.join(repoRoot, 'design-md');
  const schemaPath = path.join(repoRoot, 'metadata.schema.yaml');

  if (!fs.existsSync(schemaPath)) {
    console.error(`Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  const schema = yaml.load(fs.readFileSync(schemaPath, 'utf8'));
  const validate = ajv.compile(schema);

  const errors = [];

  const entries = fs.readdirSync(designMdDir);

  for (const entry of entries) {
    const entryPath = path.join(designMdDir, entry);
    if (!fs.statSync(entryPath).isDirectory()) continue;
    if (entry.startsWith('.')) continue;

    const designFile = path.join(entryPath, 'DESIGN.md');
    const previewHtml = path.join(entryPath, 'preview.html');
    const previewPng = path.join(entryPath, 'preview.png');
    const metadataYaml = path.join(entryPath, 'metadata.yaml');

    if (!fs.existsSync(designFile)) continue;

    console.log(`Checking ${entry}...`);

    // 1. Linter
    const lintRes = spawnSync('npx', ['@google/design.md', 'lint', 'DESIGN.md'], {
      cwd: entryPath,
      encoding: 'utf8',
      shell: true
    });
    if (lintRes.status !== 0) {
      errors.push(`${entry}: Linter failed:\n${lintRes.stdout}\n${lintRes.stderr}`);
    }

    // 2. preview.html exists
    if (!fs.existsSync(previewHtml)) {
      errors.push(`${entry}: preview.html is missing`);
    } else {
      // 3. No external links
      if (!checkNoExternalLinks(previewHtml)) {
        errors.push(`${entry}: preview.html contains external links (http:// or https://) which are forbidden`);
      }
    }

    // 4. preview.png exists
    if (!fs.existsSync(previewPng)) {
      errors.push(`${entry}: preview.png is missing`);
    }

    // 5. metadata correct
    if (!fs.existsSync(metadataYaml)) {
      errors.push(`${entry}: metadata.yaml is missing`);
    } else {
      try {
        const metadata = yaml.load(fs.readFileSync(metadataYaml, 'utf8'));
        const valid = validate(metadata);
        if (!valid) {
          errors.push(`${entry}: metadata.yaml validation failed: ${ajv.errorsText(validate.errors)}`);
        }
      } catch (e) {
        errors.push(`${entry}: metadata.yaml parse error: ${e.message}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("\nValidation errors found:");
    errors.forEach(e => console.error(`- ${e}`));
    process.exit(1);
  } else {
    console.log("\nAll checks passed.");
  }
}

main();
