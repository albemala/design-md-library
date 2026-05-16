---
name: html-to-design-md
description: Analyzes an HTML design and generates a DESIGN.md file based on the design-md spec.
---

# HTML to DESIGN.md

Analyze the design system of the provided HTML file with the goal of creating a DESIGN.md file in the same directory. The DESIGN.md file provides the user a file for easy copy & pasting.

## Reference Material
Use the following files as specification reference and examples for creating the `DESIGN.md`:
- Spec: `/Users/albertomalagoli/repos/albemala/design-md-library/design-md-spec/spec.md`
- Example 1: `/Users/albertomalagoli/repos/albemala/design-md-library/design-md-spec/DESIGN-example-1.md`
- Example 2: `/Users/albertomalagoli/repos/albemala/design-md-library/design-md-spec/DESIGN-example-2.md`
- Example 3: `/Users/albertomalagoli/repos/albemala/design-md-library/design-md-spec/DESIGN-example-3.md`

## Requirements
- Read the provided input HTML file.
- Generate a `DESIGN.md` file as output in the SAME folder as the input HTML file.
- Begin with YAML frontmatter containing all structured design tokens (colors, typography, spacing, elevation, motion, radii, shadows, etc.).
- Follow with free-form Markdown that describes the look & feel and captures design intent that token values alone cannot convey.
- The file must be entirely self-contained — do not reference any files, variables, or paths from the codebase.
- All token values must use valid YAML design token format.
- Use `npx @google/design.md lint <design md file path>` to validate the created `DESIGN.md` file and fix any errors found.

If you have access to a running local server or screenshots of the product, compare your `DESIGN.md` against the rendered UI. Revise until both the YAML tokens and the written description faithfully capture the product's visual identity.
