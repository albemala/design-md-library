import os
import sys
import subprocess
import yaml
import jsonschema

def check_no_external_links(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
        if 'http://' in content or 'https://' in content:
            return False
    return True

def main():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    design_md_dir = os.path.join(repo_root, 'design-md')
    schema_path = os.path.join(repo_root, 'metadata.schema.yaml')
    
    with open(schema_path, 'r', encoding='utf-8') as f:
        schema = yaml.safe_load(f)

    errors = []

    for entry in os.listdir(design_md_dir):
        entry_path = os.path.join(design_md_dir, entry)
        if not os.path.isdir(entry_path):
            continue
            
        design_file = os.path.join(entry_path, 'DESIGN.md')
        preview_html = os.path.join(entry_path, 'preview.html')
        preview_png = os.path.join(entry_path, 'preview.png')
        metadata_yaml = os.path.join(entry_path, 'metadata.yaml')

        if not os.path.exists(design_file):
            continue
            
        # 1. Linter
        res = subprocess.run(['npx', '@google/design.md', 'lint', 'DESIGN.md'], cwd=entry_path, capture_output=True, text=True)
        if res.returncode != 0:
            errors.append(f"{entry}: Linter failed:\n{res.stdout}\n{res.stderr}")

        # 3. preview html is available
        if not os.path.exists(preview_html):
            errors.append(f"{entry}: preview.html is missing")
        else:
            # 2. No links in preview
            if not check_no_external_links(preview_html):
                errors.append(f"{entry}: preview.html contains external links (http:// or https://) which are forbidden")

        # 4. preview image is available
        if not os.path.exists(preview_png):
            errors.append(f"{entry}: preview.png is missing")

        # 5. metadata correct
        if not os.path.exists(metadata_yaml):
            errors.append(f"{entry}: metadata.yaml is missing")
        else:
            try:
                with open(metadata_yaml, 'r', encoding='utf-8') as f:
                    metadata = yaml.safe_load(f)
                jsonschema.validate(instance=metadata, schema=schema)
            except Exception as e:
                errors.append(f"{entry}: metadata.yaml validation failed: {str(e)}")

    if errors:
        print("Validation errors found:")
        for e in errors:
            print(f"- {e}")
        sys.exit(1)
    else:
        print("All checks passed.")

if __name__ == '__main__':
    main()
