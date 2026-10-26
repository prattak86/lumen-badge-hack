# Spec Kit setup

Generated with [GitHub Spec Kit v1.2.3](https://github.com/github/spec-kit/releases/tag/v1.2.3), using Bash helpers, Codex skills, and the Copilot commands layout for GitHub Copilot Chat and Copilot CLI.

## Start a feature

Open this repository in your chosen client. Run the steps in chat, one at a time, adding your project principles, feature description, or technical approach as appropriate:

| Step | Codex | Copilot Chat in VS Code |
| --- | --- | --- |
| Project principles | `$speckit-constitution` | `/speckit.constitution` |
| Feature specification | `$speckit-specify` | `/speckit.specify` |
| Clarification (optional) | `$speckit-clarify` | `/speckit.clarify` |
| Implementation plan | `$speckit-plan` | `/speckit.plan` |
| Task breakdown | `$speckit-tasks` | `/speckit.tasks` |
| Consistency check | `$speckit-analyze` | `/speckit.analyze` |
| Implementation | `$speckit-implement` | `/speckit.implement` |
| Remaining gaps | `$speckit-converge` | `/speckit.converge` |

For Copilot CLI, start `copilot` from the repository root and select the corresponding custom agent through `/agents`, such as `speckit.constitution` or `speckit.specify`. You can also start directly with `copilot --agent speckit.specify`, then describe the feature. Copilot CLI must be installed and signed in separately.

The constitution is still the upstream template. Feature artifacts will be created under `specs/` when you describe the first feature.

## Files

- `.agents/skills/speckit-*/` contains the Codex skills.
- `.github/agents/speckit.*.agent.md` contains the Copilot custom agents.
- `.github/prompts/speckit.*.prompt.md` routes VS Code Chat commands to those agents.
- `.vscode/settings.json` recommends the starter prompts and keeps approval prompts for the workflow scripts.
- `.specify/templates/` contains the spec, plan, tasks, checklist, and constitution templates.
- `.specify/scripts/bash/` contains executable workflow helpers.
- `.specify/workflows/` contains the bundled SDD workflow.
- `.specify/integration.json` and `init-options.json` record the integration and version.
- `.specify/.gitignore` excludes checkout-local state such as the current feature pointer.

## CLI maintenance

To install the same CLI version (requires Python 3.11+ and uv):

```sh
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.2.3
specify version
specify integration status
```

Both integrations are installed; Codex is the default. The default controls shared template command wording, automated workflow dispatch, and extension/preset registration. To change it without removing either integration:

```sh
specify integration use copilot
# To return to Codex:
specify integration use codex
```

Spec Kit v1.2.3 does not declare Copilot multi-install safe. This setup explicitly opts in with `specify integration install copilot --force --script sh --integration-options="--commands"`. Consequently, `specify integration status` reports `unsafe-multi-install` and exits 1 even when every managed file is intact. The generated Codex and Copilot file paths are disjoint; no generated skills or agents have been edited. Check the other status fields for missing or modified files when maintaining the setup.

If you run automated workflows through Copilot CLI, set `SPECKIT_COPILOT_ALLOW_ALL_TOOLS=0` to retain its tool approval behavior; otherwise Spec Kit's adapter adds `--yolo` by default. Interactive agent selection above does not use that dispatcher.

Use [presets or project-local overrides](https://github.github.io/spec-kit/integrations/index.html) for customization rather than editing generated skills. Upstream licensing is retained in [LICENSE](LICENSE).
