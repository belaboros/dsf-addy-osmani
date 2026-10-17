# Workflow layer: Addy Osmani agent-skills

Skill pack: [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (plugin `agent-skills@addy-agent-skills`). Commands may appear namespaced, for example `/agent-skills:spec`.

| Factory step (docs/dsf/workflows.md) | Mode | Command or skill | Output goes to |
| --- | --- | --- | --- |
| PRD interview | design | `interview-me`, `idea-refine`, then `/spec` | `specs/prd.md` (`SPEC.md` only points to it) |
| UAT interview | design | `dsf-uat-interview` (factory skill) | `uat/features/` |
| Quality bar | design | `/constraints`, once per app | `CONSTRAINTS.md`; `dsf-factory-improve` turns enforceable items into lint and module rules |
| Architecture | design | `dsf-architect`, with `api-and-interface-design` and `documentation-and-adrs` | `docs/architecture/` |
| Plan into tasks | design | `/plan` (`planning-and-task-breakdown`) | `tasks/plan.md` and `tasks/todo.md`, plus one task per feature in the task backend linking them |
| Build | build | `/build` (`incremental-implementation`), `/test` (`test-driven-development`) | `src/`, tests, `uat/steps/` |
| Bugfix | build | `/test` with the Prove-It pattern, `debugging-and-error-recovery` | failing test first, then the fix |
| Review | build | `dsf-code-reviewer`, then `/review` (five axes) and `/code-simplify` | PR comments |
| Ship | build | `/ship` checklist before a release | PR |
| Exploration | design | `source-driven-development`, `idea-refine`, prototype on a `spike/` branch | `docs/architecture/proposals/` |
| Factory | factory | `dsf-factory-improve`; `ci-cd-and-automation` for CI changes | `.claude/`, `.github/` |

Where the pack and this factory differ, the factory wins:

- `/spec` saves `SPEC.md`. Here `SPEC.md` is a pointer; write the spec to `specs/prd.md`.
- `documentation-and-adrs` may use `docs/adr/` or `docs/decisions/`. Here ADRs live in `docs/architecture/adr/` and use `.dsf/templates/adr.md`.
- `/build` asks for one approval of the plan. With `ARCH_REVIEW=before`, the architecture PR must be approved first.
- Commit per task as `/build` does, but on a branch, never on `main`.
