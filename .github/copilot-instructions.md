# GitHub Copilot instructions for test_codespace

Purpose
- Provide concise, actionable guidance to AI coding agents for working on this repository.

Project overview
- Minimal static site: the project contains a single page `website.html` and a short `README.md`.
- No build system, no tests, no package manager — edits are made directly to files.

Where to look first
- `website.html`: the UI/markup entrypoint (only HTML in repo).
- `README.md`: repository header and basic metadata.

Recommended agent behaviors
- Limit changes to existing files unless the user asks for new assets.
- When editing `website.html`, keep changes minimal and explain visual or accessibility rationale.
- Do not add heavy frameworks or build tooling unless requested.

Dev workflows (explicit commands)
- Quick local preview: run a simple server at repo root:
  - `python3 -m http.server 8000` then open http://localhost:8000/website.html
  - or use the environment browser: `$BROWSER website.html`
- Debugging/QA: use browser DevTools to inspect DOM/CSS and test interactions (no automated tests present).

Patterns & conventions discovered here
- Single-file static content: structure and styles should be explicit (add `styles.css` in root if needed).
- Keep semantics and accessibility in mind (use `aria-*`, meaningful button text, headings).

Examples (how to apply a simple change)
- To change the button label, update `website.html` and include a short commit message:
  - Edit `website.html` → commit `docs: update button label on website.html`
- To add a stylesheet:
  - Add `styles.css` in repo root, link from `website.html`, and run the local server to verify.

Integration points
- There are no external APIs, build services, or CI integrations detected in the repository.

Commit & PR guidance for automated agents
- Make focused, single-concern commits. Example: `chore: add styles.css` or `fix: improve button label`
- Open a PR against `main` when making non-trivial changes; include a one-line summary and short rationale.

When unsure
- Ask a human: clarify if the user wants to introduce tooling, testing, or a multi-file site structure.

Files referenced
- README: [README.md](README.md)
- Main page: [website.html](website.html)

If anything above is unclear, ask for clarification before making larger repository changes.
