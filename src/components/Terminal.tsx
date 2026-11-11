"use client";
import { useEffect, useRef, useState } from "react";
import { buildingNow, experience, links, profile, projects, toolkit } from "@/content/site";
import styles from "./Terminal.module.css";

type Line = { kind: "in" | "out" | "err" | "ok"; text: string; href?: string };

const PROMPT = "guest@pranavns:~$";

const HELP = [
  "whoami        who is this guy",
  "projects      things I've shipped",
  "now           what I'm up to",
  "experience    where I've worked",
  "stack         tools I reach for",
  "contact       how to reach me",
  "nimbus        make the cloud do a trick",
  "coffee        fuel the next project",
  "clear         wipe the screen",
  "",
  "psst… try `sudo hire-pranav`",
];

function run(raw: string): Line[] | "clear" {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
  const out = (text: string, href?: string): Line => ({ kind: "out", text, href });

  switch (cmd) {
    case "":
      return [];
    case "help":
    case "?":
      return HELP.map((t) => out(t));
    case "whoami":
      return [
        out(`${profile.name}`),
        out("CS (AI) @ University of Alberta · Edmonton, AB"),
        out("I ship full-stack apps, cloud infra, and LLM features that survive production."),
      ];
    case "ls":
      return [out("projects/  experience.md  stack.txt  contact.txt  secrets.env")];
    case "cat secrets.env":
      return [{ kind: "err", text: "nice try 🙂" }];
    case "projects":
    case "ls projects":
    case "ls projects/":
      return [
        ...projects.map((p) => out(`▸ ${p.title.padEnd(12)} ${p.kind}`, p.live)),
        out(""),
        out("in progress:"),
        ...buildingNow.map((b) => out(`▸ ${b.title}`, b.href)),
      ];
    case "now":
      return [
        out("▸ building Failure Forensics, root-cause analysis for AI incidents"),
        out("▸ looking for a 4, 8 or 12-month internship"),
        out("▸ studying for AWS certs, and learning French (lentement)"),
      ];
    case "experience":
    case "cat experience.md":
      return experience.map((r) => out(`▸ ${r.role} · ${r.org} (${r.period})`));
    case "stack":
    case "skills":
    case "cat stack.txt":
      return [out(toolkit.join(" · "))];
    case "contact":
    case "cat contact.txt":
      return [
        out(`email     ${profile.email}`, `mailto:${profile.email}`),
        out("linkedin  /in/pranav-ns-", links.linkedin),
        out("github    @Pranav-ns", links.github),
        out("call      book 30 min", links.calendly),
      ];
    case "nimbus":
    case "pet":
      window.dispatchEvent(new Event("nimbus:trick"));
      return [{ kind: "ok", text: "☁️ nimbus: on it!" }];
    case "coffee":
      return [out("☕ thank you! → buymeacoffee.com/pranavns", links.coffee)];
    case "hire-pranav":
    case "hire pranav":
      return [{ kind: "err", text: "permission denied. (maybe try sudo?)" }];
    case "sudo hire-pranav":
    case "sudo hire pranav":
      return [
        { kind: "ok", text: "[sudo] verifying recruiter credentials… ✓" },
        { kind: "ok", text: "great choice. opening a draft email →" },
        out(profile.email, `mailto:${profile.email}?subject=Let's%20talk%20about%20an%20internship`),
      ];
    case "sudo":
      return [{ kind: "err", text: "usage: sudo hire-pranav" }];
    case "rm -rf /":
    case "sudo rm -rf /":
      return [{ kind: "err", text: "not today 😅" }];
    case "clear":
      return "clear";
    default:
      if (cmd.startsWith("echo ")) return [out(raw.trim().slice(5))];
      return [{ kind: "err", text: `command not found: ${cmd.split(" ")[0]}. type \`help\`` }];
  }
}

const CHIPS = ["help", "whoami", "projects", "now", "sudo hire-pranav"];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "welcome! this terminal actually works." },
    { kind: "out", text: "type `help`, or tap a command below." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const typedOnce = useRef(false);

  useEffect(() => {
    const el = screenRef.current;
    if (el && typedOnce.current) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = (raw: string) => {
    typedOnce.current = true;
    const result = run(raw);
    if (result === "clear") {
      setLines([]);
    } else {
      setLines((prev) => [...prev, { kind: "in", text: raw }, ...result]);
      // Follow through on the joke with a real draft email.
      if (/^sudo hire[- ]pranav$/i.test(raw.trim())) {
        setTimeout(() => {
          window.location.href = `mailto:${profile.email}?subject=Let's%20talk%20about%20an%20internship`;
        }, 900);
      }
    }
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 30));
    setCursor(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (next >= 0) { setCursor(next); setValue(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.titlebar}>
        <span className={styles.lights} aria-hidden="true"><i /><i /><i /></span>
        <span>guest@pranavns — zsh</span>
      </div>

      <div
        className={styles.screen}
        ref={screenRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        role="log"
        aria-live="polite"
      >
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <p key={i}><span className={styles.prompt}>{PROMPT}</span> {l.text}</p>
          ) : (
            <p key={i} className={styles[l.kind]}>
              {l.href ? (
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {l.text}
                </a>
              ) : (
                l.text || " "
              )}
            </p>
          ),
        )}
        <label className={styles.inputRow}>
          <span className={styles.prompt}>{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal command"
          />
        </label>
      </div>

      <div className={styles.chips}>
        {CHIPS.map((c) => (
          <button key={c} type="button" onClick={() => submit(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
