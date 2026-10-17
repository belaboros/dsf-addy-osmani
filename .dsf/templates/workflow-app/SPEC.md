# {{APP_NAME}} specification

The agent-skills commands look for a spec here. In this factory the spec is split by purpose; read these files as the spec:

- `specs/vision.md`: problem, users, goals, non-goals
- `specs/prd.md`: numbered requirements
- `specs/features/`: feature specs, when a feature needs more detail than the PRD
- `uat/features/`: acceptance scenarios (Gherkin), the definition of done
- `docs/architecture/`: modules, ADRs and the rules the code must follow

`/spec` writes or updates `specs/prd.md` (not this file).
