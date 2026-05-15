# Contributing to Design.md Library

Thanks for your interest in contributing.

This repository is a curated, open library of high-quality `DESIGN.md` files. The goal is to build design systems that are actually useful for AI-generated UI, not just valid, but practical and reusable.

## Contribution Principles

* Quality over quantity
* Practical usability over theoretical completeness
* Clarity and consistency across all files

## License Agreement

By contributing to this repository, you agree that your contributions are provided under the terms of the repository’s MIT License.

## Before You Start

Before opening a Pull Request, it is strongly recommended to open an Issue first.

Use Issues to:

* Propose a new `DESIGN.md` file
* Suggest improvements to an existing file
* Discuss scope and avoid duplication

## What You Can Contribute

You can contribute by:

* Adding a new `DESIGN.md` file
* Improving or expanding an existing file
* Fixing inconsistencies or unclear rules

## File Structure

Each design system must follow this structure:

* A dedicated folder inside `/design-md/`
* Folder name must match the design name using slug-case
* Inside the folder:

  * `DESIGN.md` - The design system definition file.
  * `metadata.yaml` - Metadata about the design system.
  * `preview.html` - A self-contained HTML preview of the design system.
  * `preview.png` - A high-quality screenshot of the preview.

Example:

```
/design-md/fintech-dashboard-minimal/
  ├── DESIGN.md
  ├── metadata.yaml
  ├── preview.html
  └── preview.png
```

### Generating Previews

To ensure high quality and consistency, each submission must include a functional preview.

* **HTML Preview**: Use the [design-md-to-html](.agents/skills/design-md-to-html/SKILL.md) skill to generate a high-quality, self-contained HTML showcase.
* **LLM Recommendation**: Based on our experiments, **OpenAI GPT 5.5** (or the latest state-of-the-art model) provides the best results for generating the preview code, as it excels at following complex design tokens and constraints.
* **Screenshot**: Once the `preview.html` is generated and verified, take a representative screenshot and save it as `preview.png`.

Use the provided templates:

* `metadata_template.yaml`
* `metadata.schema.yaml`

## Quality Standards

Submissions must:

* Be practically useful for generating UI with AI
* Include clear design tokens (colors, spacing, typography, etc.)
* Include meaningful rules and guardrails, not just tokens
* Be manually reviewed and refined, not raw AI output

Low-effort, overly generic, or unclear systems will be rejected.

## Originality and Rights

Submissions must be original.

* Do not submit design systems that mimic or intentionally replicate existing branded systems such as Apple, Stripe, or similar. Inspired by existing products is acceptable, direct replication is not.
* Do not submit content you do not have the rights to share

By submitting a Pull Request, you confirm that:

* You are the creator of the design system, or you have the rights to share it
* You are responsible for ensuring your submission does not violate any copyright or ownership rules

Pull Requests that violate these requirements will be rejected.

The PR template will require contributors to explicitly confirm this.

## Validation

All `DESIGN.md` files are automatically validated in Pull Requests.

* The linter runs via CI
* PRs that fail validation will not be accepted

You can run it locally:

```
npx @google/design.md lint <file>.md
```

## Avoid Duplication

Before creating a new file:

* Check existing systems in the repository
* Avoid submitting minor variations of existing designs
* Prefer improving or extending current files when possible

## Pull Request Guidelines

* Keep PRs focused, one system or one clear change
* Use clear titles and descriptions
* Explain what the system is for and why it’s useful
* Link the related Issue if applicable

All PRs are reviewed manually and are not automatically approved.

## Review Process

Submissions are evaluated based on:

* Clarity and consistency
* Practical usefulness
* Alignment with the `design.md` standard
* Overall quality

Maintainers may:

* Request changes
* Edit submissions for consistency
* Reject submissions that do not meet the standards

## Notes

* This is a curated library and not every submission will be accepted
* Files may evolve over time
* The goal is to build a high-quality ecosystem, not maximize volume

For questions or ideas, open an Issue.
