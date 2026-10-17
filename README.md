# Dark / gray Software Factory

The goal of these repos is to raise the level of autonomy and automation in software development and to take laborious work off the human: agents interview, specify, design, code, test, review and maintain, while the human sets the vision and makes the decisions that matter. It is a gray factory, not yet a fully dark one: humans still review architecture and approve key changes, and the factory is meant to need fewer of those reviews over time.

**dsf-addy-osmani** is the factory built on [agent-skills](https://github.com/addyosmani/agent-skills) by Addy Osmani: lifecycle commands from spec to ship, with security, test and performance reviewer personas. The broadest coverage of the five.

It is [dsf-base](https://github.com/belaboros/dsf-base) (hooks, modes, checks, architecture metrics, review agents, CI, docs) plus this skill pack, so everything common to the five factories comes from one place and improvements flow both ways.

## Start an application

```bash
git clone https://github.com/belaboros/dsf-addy-osmani && cd dsf-addy-osmani
./cloneForApplication.sh my-app --create-github --tasks github --arch-review before --stack typescript
cd ../my-app && make design
```

`cloneForApplication.sh --help` lists the options; [docs/dsf/setup.md](docs/dsf/setup.md) explains them, the prerequisites, and how to turn on the GitHub agents.

## How a feature flows here

`/spec` → `/plan` → `/build` + `/test` → `/review` → `/ship`

Around that flow the factory adds the UAT interview (`dsf-uat-interview`), the architect (`dsf-architect`), the review agent (`dsf-code-reviewer`), and `make check` in the Stop hook and CI. Details: [docs/workflow/README.md](docs/workflow/README.md); step-by-step mapping for agents: [.dsf/CLAUDE.workflow.md](.dsf/CLAUDE.workflow.md).

## Documentation

| Read | For |
| --- | --- |
| [docs/workflow/](docs/workflow/README.md) | this skill pack: flow, strengths and weaknesses, upgrades |
| [docs/dsf/](docs/dsf/README.md) | the factory: usage, workflows, loops and hooks, architecture health, review, tasks, evolution, rebuild |

## Keeping it current

- Updates from dsf-base: `make sync-pull` (or the weekly sync PR). Merge sync PRs with a merge commit, not a squash.
- Improvements made here that every factory needs: commit them separately and `make contribute TOPIC=<name>` to open a PR on dsf-base.
- Improvements made in an application come here the same way.
