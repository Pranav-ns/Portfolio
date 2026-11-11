import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

// Deterministic star field so server and client render the same sky.
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const round = (v: number) => Math.round(v * 10) / 10;
  return { x: round(r(1) * 100), y: round(r(2) * 70), s: round(1 + r(3) * 1.8), d: round(r(4) * 4) };
});

function Glow({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.glowLink}>
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [before, highlight, after] = profile.headline;

  return (
    <>
      {/* Sky: stars and drifting aurora ribbons behind everything */}
      <div className={styles.sky} aria-hidden="true">
        <div className={`${styles.ribbon} ${styles.r1}`} />
        <div className={`${styles.ribbon} ${styles.r2}`} />
        <div className={`${styles.ribbon} ${styles.r3}`} />
        {STARS.map((s, i) => (
          <span
            key={i}
            className={styles.star}
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
          />
        ))}
      </div>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.logo}>
            pranav<span>✦</span>
          </a>
          <nav className={styles.nav} aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Journey</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.avatarWrap}>
              <Image src="/pranav-profile.jpg" alt={profile.name} width={112} height={112} className={styles.avatar} priority />
            </div>
            <p className={styles.coords}>
              53.5° N · <LocalTime />
            </p>
            <h1 className={styles.headline}>
              {before}
              <span className={styles.auroraText}>{highlight}</span>
              {after}
            </h1>
            <p className={styles.lede}>{profile.intro}</p>
            <div className={styles.ctas}>
              <a href="#contact" className={styles.primary}>Get in touch</a>
              <a href="#work" className={styles.secondary}>Explore my work ↓</a>
            </div>
            <p className={styles.status}>
              <span className={styles.dot} aria-hidden="true" /> {profile.availability}
            </p>
          </div>

          {/* Boreal forest silhouette */}
          <svg className={styles.forest} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 160V118l20-30 14 22 18-46 16 40 12-20 20 34 18-52 16 44 14-24 22 36 16-58 18 50 12-18 20 30 18-48 14 38 20-28 16 32 18-62 20 56 12-22 18 34 16-44 18 38 14-26 22 40 18-56 16 48 14-20 20 30 18-50 16 42 12-24 22 36 16-60 18 52 14-22 20 32 18-46 14 38 20-30 18 36 16-54 18 46 12-20 22 34 16-48 20 42 14-26 18 30 20-58 16 50 14-20 20 32 18-46 16 38 14-24 20 34 18-52 16 44 12-22 22 38 16-56 18 48 14-20 20 30 18-44 14 36 20-28 18 34 16-50 18 44 12-18 22 30 16-46 20 40 14-24 18 32 20-56 16 48 14-22 20 34 18-44 16 36 14-26 20 38 18-54 16 46 12-20 22 32 16-48 20 40 V160Z" />
          </svg>
        </section>

        <div className={styles.container}>
          {/* ---------- Work ---------- */}
          <section id="work" className={styles.section}>
            <Reveal>
              <p className={styles.kicker}>Selected work</p>
              <h2 className={styles.h2}>Things I&apos;ve shipped</h2>
            </Reveal>

            <div className={styles.projects}>
              {projects.map((p, i) => {
                const Demo = DEMOS[p.demo];
                return (
                  <Reveal key={p.slug}>
                    <article className={styles.card}>
                      <div className={styles.cardText}>
                        <span className={styles.num}>0{i + 1}</span>
                        <h3>{p.title}</h3>
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
                        <ul className={styles.stack}>
                          {p.stack.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                        <div className={styles.links}>
                          {p.live && <Glow href={p.live}>Live site</Glow>}
                          {p.code && <Glow href={p.code}>Code</Glow>}
                        </div>
                      </div>
                      <div className={styles.demo}>
                        <Demo />
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal>
              <div className={styles.building}>
                <p className={styles.kicker}>On the horizon</p>
                <div className={styles.buildGrid}>
                  {buildingNow.map((b) => (
                    <a key={b.title} href={b.href} target="_blank" rel="noopener noreferrer" className={styles.buildCard}>
                      <span className={styles.buildTitle}>
                        {b.title} <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                      <span>{b.summary}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ---------- Journey: experience as a constellation ---------- */}
          <section id="experience" className={styles.section}>
            <Reveal>
              <p className={styles.kicker}>Journey</p>
              <h2 className={styles.h2}>Where I&apos;ve been</h2>
            </Reveal>
            <Reveal>
              <ol className={styles.constellation}>
                {experience.map((r, i) => (
                  <li key={r.role}>
                    <details className={styles.role} open={i === 0}>
                      <summary>
                        <span className={styles.starDot} aria-hidden="true" />
                        <span className={styles.rolePeriod}>{r.period}</span>
                        <span className={styles.roleName}>{r.role}</span>
                        <span className={styles.roleOrg}>{r.org}</span>
                      </summary>
                      <ul className={styles.roleBody}>
                        {r.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <div className={styles.extras}>
                <div className={styles.glass}>
                  <p className={styles.kicker}>Toolkit</p>
                  <ul className={styles.tags}>
                    {toolkit.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.glass}>
                  <p className={styles.kicker}>Also</p>
                  {extras.map((e) => (
                    <p key={e} className={styles.extra}>✦ {e}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ---------- Terminal ---------- */}
          <section className={styles.section}>
            <Reveal>
              <p className={styles.kicker}>Poke around</p>
              <h2 className={styles.h2}>A terminal that works</h2>
            </Reveal>
            <Reveal>
              <div className={styles.termWrap}>
                <Terminal />
              </div>
            </Reveal>
          </section>

          {/* ---------- Contact ---------- */}
          <section id="contact" className={`${styles.section} ${styles.contact}`}>
            <Reveal>
              <p className={styles.kicker}>Contact</p>
              <h2 className={styles.contactTitle}>
                Let&apos;s build <span className={styles.auroraText}>something.</span>
              </h2>
              <p className={styles.contactLead}>
                Hiring for an internship, or have an idea worth building? My inbox is open.
              </p>
              <div className={styles.email}>
                <CopyEmail email={profile.email} />
              </div>
              <div className={styles.links} style={{ justifyContent: "center" }}>
                <Glow href={links.calendly}>Book a call</Glow>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.glowLink}>
                  <LinkedInIcon size={14} /> LinkedIn
                </a>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.glowLink}>
                  <GithubIcon size={14} /> GitHub
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} {profile.name} · Edmonton, under the northern lights</span>
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
