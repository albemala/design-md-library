---
# tokens
components:
  bad-contrast:
    backgroundColor: "#FFFF00"
    textColor: "#FFFFFF"
  broken-ref:
    backgroundColor: "{colors.void}"
  valid-ref:
    backgroundColor: "{colors.secondary}"

colors:
  # Missing primary rule: No 'primary' color defined
  secondary: "#0000FF"
  # Orphaned tokens rule: 'unused' is defined but not referenced
  unused: "#FF00FF"

# Missing typography section (no typography: in frontmatter)
# Missing spacing section (no spacing: in frontmatter)
# Missing rounded section (no rounded: in frontmatter)
---

# Chaos Design

This design system is intentionally broken to test the linter rules.

## Components
This header appears before Colors, which is out of order.

## Colors
This header appears after Components.
