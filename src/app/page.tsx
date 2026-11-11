import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CopyEmail from "@/components/ui/CopyEmail";
import LocalTime from "@/components/ui/LocalTime";
import Reveal from "@/components/ui/Reveal";
import Terminal from "@/components/Terminal";
import StatusBoard from "@/components/demos/StatusBoard";
import ChatPath from "@/components/demos/ChatPath";
import ShelfScan from "@/components/demos/ShelfScan";
import {
  buildingNow,
  experience,
  extras,
  links,
  profile,
  projects,
  toolkit,
  type Project,
} from "@/content/site";
import styles from "./page.module.css";

const DEMOS: Record<Project["demo"], React.ComponentType> = {
  status: StatusBoard,
  chat: ChatPath,
  shelf: ShelfScan,
};

// A stable, git-looking short hash for each role (purely decorative).
function shortHash(text: string) {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {children}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [before, highlight, after] = profile.headline;

  return (
    <>
      <div className={styles.grid} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.path}>
            <span className={styles.dim}>~/</span>pranav-ns
            <span className={styles.caret} aria-hidden="true" />
          </a>
          <nav className={styles.tabs} aria-label="Sections">
            <a href="#work">work.tsx</a>
            <a href="#experience">git.log</a>
            <a href="#contact">contact.sh</a>
          </nav>
        </div>
      </header>

      <main id="top" className={styles.main}>
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.comment}>
              {"// hi, I'm Pranav · "}
              <LocalTime />
            </p>
            <h1 className={styles.headline}>
              {before}
              <span className={styles.glow}>{highlight}</span>
              {after}
            </h1>

            <pre className={styles.code} aria-label="Quick facts">
              <code>
                <span className={styles.kw}>const</span> <span className={styles.var}>pranav</span> = {"{\n"}
                {"  "}<span className={styles.key}>role</span>: <span className={styles.str}>&quot;full-stack · cloud · AI&quot;</span>,{"\n"}
                {"  "}<span className={styles.key}>school</span>: <span className={styles.str}>&quot;UAlberta, CS (AI)&quot;</span>,{"\n"}
                {"  "}<span className={styles.key}>building</span>: <span className={styles.str}>&quot;{profile.now.replace(/^Building /, "")}&quot;</span>,{"\n"}
                {"  "}<span className={styles.key}>openToWork</span>: <span className={styles.bool}>true</span>, <span className={styles.cm}>{"// 4, 8 or 12 months"}</span>{"\n"}
                {"};"}
              </code>
            </pre>

            <div className={styles.ctas}>
              <a href="#contact" className={styles.primary}>
                <span className={styles.dim}>$</span> ./say-hi.sh
              </a>
              <a href="#work" className={styles.secondary}>
                view projects ↓
              </a>
            </div>
          </div>

          <figure className={styles.photoWin}>
            <figcaption>
              <span className={styles.lights} aria-hidden="true"><i /><i /><i /></span>
              pranav.jpg
            </figcaption>
            <Image
              src="/pranav-profile.jpg"
              alt={profile.name}
              width={320}
              height={320}
              className={styles.photo}
              priority
            />
            <span className={styles.scan} aria-hidden="true" />
          </figure>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className={styles.section}>
          <Reveal>
            <h2 className={styles.h2}>
              <span className={styles.hash}>##</span> work
            </h2>
          </Reveal>

          <ol className={styles.projects}>
            {projects.map((p, i) => {
              const Demo = DEMOS[p.demo];
              return (
                <li key={p.slug}>
                  <Reveal>
                    <article className={styles.project}>
                      <div className={styles.fileTab}>
                        <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                        {p.slug}.tsx
                      </div>
                      <div className={styles.projectBody}>
                        <div>
                          <h3 className={styles.h3}>{p.title}</h3>
                          <p className={styles.kind}>{p.kind}</p>
                          <p className={styles.summary}>{p.summary}</p>
                          {p.metrics && (
                            <dl className={styles.metrics}>
                              {p.metrics.map((m) => (
                                <div key={m.label}>
                                  <dd>{m.value}</dd>
                                  <dt>{m.label}</dt>
                                </div>
                              ))}
                            </dl>
                          )}
                          <p className={styles.stack}>
                            <span className={styles.dim}>import</span> {"{ "}
                            {p.stack.join(", ")}
                            {" }"}
                          </p>
                          <div className={styles.links}>
                            {p.live && <Ext href={p.live}>live</Ext>}
                            {p.code && <Ext href={p.code}>source</Ext>}
                          </div>
                        </div>
                        <div className={styles.demo}>
                          <Demo />
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal>
            <div className={styles.todo}>
              <p className={styles.todoHead}>
                <span className={styles.amber}>TODO</span> in progress
              </p>
              {buildingNow.map((b) => (
                <a key={b.title} href={b.href} target="_blank" rel="noopener noreferrer" className={styles.todoRow}>
                  <span className={styles.box} aria-hidden="true">[ ]</span>
                  <span className={styles.todoTitle}>{b.title}</span>
                  <span className={styles.dim}>{b.summary}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------- Experience as git log ---------- */}
        <section id="experience" className={styles.section}>
          <Reveal>
            <h2 className={styles.h2}>
              <span className={styles.hash}>##</span> git log --career
            </h2>
          </Reveal>
          <Reveal>
            <div className={styles.log}>
              {experience.map((r, i) => (
                <details key={r.role} className={styles.commit} open={i === 0}>
                  <summary>
                    <span className={styles.graph} aria-hidden="true">*</span>
                    <span className={styles.sha}>{shortHash(r.role + r.org)}</span>
                    <span className={styles.msg}>
                      {r.role} <span className={styles.dim}>@</span> {r.org}
                    </span>
                    <span className={styles.date}>{r.period}</span>
                  </summary>
                  <div className={styles.diff}>
                    {r.points.map((pt) => (
                      <p key={pt}>
                        <span className={styles.plus}>+</span> {pt}
                      </p>
                    ))}
                    <p className={styles.dim}>
                      {"  "}
                      {r.place}
                      {r.orgUrl && (
                        <>
                          {" · "}
                          <Ext href={r.orgUrl}>site</Ext>
                        </>
                      )}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </Reveal>

          <div className={styles.split}>
            <Reveal>
              <pre className={styles.code}>
                <code>
                  <span className={styles.cm}>{"// package.json"}</span>{"\n"}
                  <span className={styles.key}>&quot;dependencies&quot;</span>: {"{\n"}
                  {toolkit.map((t, i) => (
                    <span key={t}>
                      {"  "}<span className={styles.str}>&quot;{t}&quot;</span>: <span className={styles.str}>&quot;^daily&quot;</span>
                      {i < toolkit.length - 1 ? "," : ""}
                      {"\n"}
                    </span>
                  ))}
                  {"}"}
                </code>
              </pre>
            </Reveal>
            <Reveal delay={100}>
              <pre className={styles.code}>
                <code>
                  <span className={styles.cm}>{"// also.md"}</span>{"\n"}
                  {extras.map((e) => (
                    <span key={e}>
                      <span className={styles.amber}>-</span> {e}
                      {"\n"}
                    </span>
                  ))}
                </code>
              </pre>
            </Reveal>
          </div>
        </section>

        {/* ---------- Terminal ---------- */}
        <section className={styles.section}>
          <Reveal>
            <h2 className={styles.h2}>
              <span className={styles.hash}>##</span> shell
            </h2>
            <p className={styles.note}>It actually works. Try typing a command.</p>
          </Reveal>
          <Reveal>
            <Terminal />
          </Reveal>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <Reveal>
            <p className={styles.comment}>{"$ ./contact.sh"}</p>
            <h2 className={styles.bigTitle}>
              Let&apos;s build something<span className={styles.caretBig} aria-hidden="true" />
            </h2>
            <p className={styles.summary}>
              Hiring for an internship, or have an idea worth building? My inbox is open.
            </p>
            <div className={styles.email}>
              <CopyEmail email={profile.email} />
            </div>
            <div className={styles.links}>
              <Ext href={links.calendly}>book a call</Ext>
              <Ext href={links.linkedin}>linkedin</Ext>
              <Ext href={links.github}>github</Ext>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          <span className={styles.accent}>●</span> {profile.name} · © {new Date().getFullYear()} · Edmonton, AB
        </span>
        <span className={styles.footerLinks}>
          <Link href="/blogs">blog</Link>
          <Link href="/freelancing">freelancing</Link>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer">instagram</a>
          <a href={links.coffee} target="_blank" rel="noopener noreferrer">coffee</a>
        </span>
      </footer>
    </>
  );
}
