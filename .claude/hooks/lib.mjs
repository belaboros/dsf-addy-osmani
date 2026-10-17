// Shared helpers for the factory's Claude Code hooks. Hooks must stay fast and dependency-free.
import { readFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { join, relative, isAbsolute } from "node:path";

export const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
export const stateDir = join(projectDir, ".dsf", "state");

export function readInput() {
  try {
    return JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

export function readJson(rel, fallback = null) {
  const file = join(projectDir, rel);
  if (!existsSync(file)) return fallback;
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

export function readSetting(file, key) {
  const path = join(projectDir, file);
  if (!existsSync(path)) return undefined;
  const line = readFileSync(path, "utf8").split("\n").reverse().find((l) => l.startsWith(`${key}=`));
  return line?.slice(key.length + 1);
}

// The current mode and the path prefixes it protects (factory paths expanded).
export function currentMode() {
  const cfg = readJson(".dsf/modes.json", { default: "build", modes: {}, factory: [], alwaysProtect: [] });
  const name = process.env.DSF_MODE || cfg.default || "build";
  const mode = cfg.modes?.[name];
  if (!mode) return { name, description: `unknown mode '${name}'`, protect: [], unknown: true };
  const protect = [
    ...(cfg.alwaysProtect || []),
    ...mode.protect.flatMap((p) => (p === "@factory" ? cfg.factory || [] : [p])),
  ];
  return { name, description: mode.description, protect };
}

export function toRepoPath(p) {
  if (!p) return "";
  const rel = isAbsolute(p) ? relative(projectDir, p) : p;
  return rel.replaceAll("\\", "/").replace(/^\.\//, "");
}

export function protectedBy(repoPath, protect) {
  return protect.find((p) => (p.endsWith("/") ? repoPath.startsWith(p) : repoPath === p));
}

export function logEvent(input, event, details = {}) {
  try {
    mkdirSync(stateDir, { recursive: true });
    appendFileSync(
      join(stateDir, "events.jsonl"),
      JSON.stringify({ ts: new Date().toISOString(), session: input.session_id, event, ...details }) + "\n",
    );
  } catch {
    // Logging must never break a hook.
  }
}

export function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason },
    }),
  );
  process.exit(0);
}
