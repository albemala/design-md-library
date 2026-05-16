---
name: design-md-to-metadata
description: Generates a metadata.yaml file for a given DESIGN.md file based on the project schema and template.
---

# DESIGN.md to metadata.yaml

Analyze the provided `DESIGN.md` file to generate a companion `metadata.yaml` file in the same directory. The metadata provides structured information about the design system.

## Reference Material
Use the following files as strict references for the structure and validation of the `metadata.yaml` file:
- Schema: `/Users/albertomalagoli/repos/albemala/design-md-library/metadata.schema.yaml`
- Template: `/Users/albertomalagoli/repos/albemala/design-md-library/metadata_template.yaml`

## Requirements
- Take a `DESIGN.md` file as input.
- Generate a `metadata.yaml` file as output.
- The output `metadata.yaml` file MUST be placed in the EXACT SAME directory as the input `DESIGN.md` file.
- The generated metadata must strictly conform to the provided schema (`metadata.schema.yaml`) and follow the structure of the template (`metadata_template.yaml`).
- Extract relevant information from the `DESIGN.md` (such as theme name, tags, description, etc.) to populate the metadata fields appropriately.
- Ensure that the resulting YAML is syntactically valid and accurately represents the design system.
