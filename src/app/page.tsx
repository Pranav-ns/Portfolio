import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Mail, MapPin, Sparkles } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/Icons";
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
const TINTS = ["var(--lav)", "var(--mint)", "var(--peach)"];

function Chip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.chip}>
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [before, highlight, after] = profile.headline;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true">P</span>
            Pranav NS
          </a>
          <nav className={styles.nav} aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact" className={styles.navCta}>Contact</a>
          </nav>
        </div>
      </header>

      <main id="top" className={styles.main}>
        {/* ---------- Hero bento ---------- */}
        <section className={styles.bento}>
          <div className={`${styles.tile} ${styles.intro}`}>
            <p className={styles.hello}>
              <span className={styles.wave} aria-hidden="true">👋</span> Hi, I&apos;m Pranav
            </p>
            <h1 className={styles.headline}>
              {before}
              <span className={styles.grad}>{highlight}</span>
              {after}
            </h1>
            <p className={styles.lede}>{profile.intro}</p>
            <div className={styles.introCtas}>
              <a href="#contact" className={styles.primary}>
                <Mail size={16} aria-hidden="true" /> Get in touch
              </a>
              <a href="#work" className={styles.secondary}>See projects</a>
            </div>
          </div>

          <div className={`${styles.tile} ${styles.photoTile}`}>
            <Image src="/pranav-profile.jpg" alt={profile.name} fill sizes="(max-width: 760px) 100vw, 300px" className={styles.photo} priority />
            <span className={styles.photoTag}>CS (AI) · UAlberta</span>
          </div>

          <div className={`${styles.tile} ${styles.status}`}>
            <span className={styles.pulse} aria-hidden="true" />
            <p className={styles.tileLabel}>Status</p>
            <p className={styles.tileBig}>Open to internships</p>
            <p className={styles.tileSmall}>4, 8 or 12 months · SWE, cloud, AI/ML</p>
          </div>

          <div className={`${styles.tile} ${styles.clock}`}>
            <p className={styles.tileLabel}>
              <MapPin size={13} aria-hidden="true" /> Local time
            </p>
            <p className={styles.clockTime}>
              <LocalTime bare />
            </p>
            <p className={styles.tileSmall}>Edmonton, Alberta</p>
          </div>

          <div className={`${styles.tile} ${styles.award}`}>
            <Award size={22} aria-hidden="true" />
            <p className={styles.tileBig}>Maple Leaf Award</p>
            <p className={styles.tileSmall}>2025 · Academic excellence</p>
          </div>

          <div className={`${styles.tile} ${styles.stackTile}`}>
            <p className={styles.tileLabel}>Toolkit</p>
            <div className={styles.marquee}>
              <div className={styles.marqueeTrack}>
                {[0, 1].map((n) => (
                  <span key={n} aria-hidden={n === 1}>
                    {toolkit.map((t) => (
                      <span key={t} className={styles.tool}>{t}</span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className={styles.section}>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2>Selected work</h2>
              <p>Real projects, shipped and running.</p>
            </div>
          </Reveal>

          <div className={styles.projects}>
            {projects.map((p, i) => {
              const Demo = DEMOS[p.demo];
              return (
                <Reveal key={p.slug}>
                  <article className={`${styles.tile} ${styles.project}`} style={{ ["--tint" as string]: TINTS[i % TINTS.length] }}>
                    <div className={styles.projectText}>
                      <span className={styles.projectKind}>{p.kind}</span>
                      <h3>{p.title}</h3>
                      <p className={styles.projectSummary}>{p.summary}</p>
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
                      <ul className={styles.stack}>
                        {p.stack.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <div className={styles.projectLinks}>
                        {p.live && <Chip href={p.live}>Live site</Chip>}
                        {p.code && <Chip href={p.code}>Code</Chip>}
                      </div>
                    </div>
                    <div className={styles.projectDemo}>
                      <Demo />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className={styles.buildRow}>
            {buildingNow.map((b) => (
              <Reveal key={b.title}>
                <a href={b.href} target="_blank" rel="noopener noreferrer" className={`${styles.tile} ${styles.buildTile}`}>
                  <span className={styles.wip}>
                    <Sparkles size={13} aria-hidden="true" /> In progress
                  </span>
                  <span className={styles.buildTitle}>{b.title}</span>
                  <span className={styles.tileSmall}>{b.summary}</span>
                  <ArrowUpRight size={18} className={styles.corner} aria-hidden="true" />
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- Experience + terminal ---------- */}
        <section id="experience" className={styles.section}>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2>Experience</h2>
              <p>Tap a role for details.</p>
            </div>
          </Reveal>
          <div className={styles.split}>
            <Reveal>
              <div className={`${styles.tile} ${styles.roles}`}>
                {experience.map((r, i) => (
                  <details key={r.role} className={styles.role} open={i === 0}>
                    <summary>
                      <span className={styles.roleDot} aria-hidden="true" />
                      <span className={styles.roleMain}>
                        <span className={styles.roleName}>{r.role}</span>
                        <span className={styles.roleOrg}>{r.org}</span>
                      </span>
                      <span className={styles.rolePeriod}>{r.period}</span>
                    </summary>
                    <ul className={styles.roleBody}>
                      {r.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </details>
                ))}
                <p className={styles.extra}>{extras[1]}.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={`${styles.tile} ${styles.termTile}`}>
                <p className={styles.tileLabel}>Try the terminal</p>
                <Terminal />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className={styles.section}>
          <Reveal>
            <div className={styles.contactGrid}>
              <div className={`${styles.tile} ${styles.contact}`}>
                <p className={styles.tileLabelLight}>Contact</p>
                <h2>Let&apos;s build something.</h2>
                <p>Hiring for an internship, or have an idea worth building? My inbox is open.</p>
                <div className={styles.email}>
                  <CopyEmail email={profile.email} />
                </div>
              </div>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={`${styles.tile} ${styles.social}`}>
                <LinkedInIcon size={26} />
                <span>LinkedIn</span>
                <ArrowUpRight size={18} className={styles.corner} aria-hidden="true" />
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className={`${styles.tile} ${styles.social}`}>
                <GithubIcon size={26} />
                <span>GitHub</span>
                <ArrowUpRight size={18} className={styles.corner} aria-hidden="true" />
              </a>
              <a href={links.calendly} target="_blank" rel="noopener noreferrer" className={`${styles.tile} ${styles.social} ${styles.socialAccent}`}>
                <span className={styles.calIcon} aria-hidden="true">📅</span>
                <span>Book a call</span>
                <ArrowUpRight size={18} className={styles.corner} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className={styles.footerLinks}>
          <Link href="/blogs">Blog</Link>
          <Link href="/freelancing">Freelancing</Link>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={links.coffee} target="_blank" rel="noopener noreferrer">Buy me a coffee</a>
        </span>
      </footer>
    </>
  );
}
