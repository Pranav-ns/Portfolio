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

// Each project card gets its own colour.
const CARD_COLORS = ["var(--lilac)", "var(--lime)", "var(--pink)"];

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.pill}>
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [before, highlight, after] = profile.headline;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.wordmark}>
            pranav<span>.</span>ns
          </a>
          <nav className={styles.nav} aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact" className={styles.navCta}>
              Say hi
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className={styles.hello}>
                <span className={styles.wave} aria-hidden="true">👋</span> Hi, I&apos;m Pranav ·{" "}
                <LocalTime />
              </p>
              <h1 className={styles.headline}>
                {before}
                <mark className={styles.mark}>{highlight}</mark>
                {after}
              </h1>
              <p className={styles.lede}>{profile.intro}</p>
              <div className={styles.heroCtas}>
                <a href="#contact" className={styles.bigButton}>
                  Get in touch →
                </a>
                <a href="#work" className={styles.ghostButton}>
                  See my work
                </a>
              </div>
            </div>

            <div className={styles.portrait}>
              <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path id="ringPath" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
                </defs>
                <text>
                  <textPath href="#ringPath" textLength="508" lengthAdjust="spacing">
                    full-stack ✦ cloud ✦ ai engineering ✦ devops ✦
                  </textPath>
                </text>
              </svg>
              <Image
                src="/pranav-profile.jpg"
                alt={profile.name}
                width={220}
                height={220}
                className={styles.photo}
                priority
              />
              <span className={`${styles.sticker} ${styles.stickerA}`}>
                <span className={styles.liveDot} aria-hidden="true" /> open to internships
              </span>
              <span className={`${styles.sticker} ${styles.stickerB}`}>now @ StackPro</span>
            </div>
          </div>
        </section>

        {/* ---------- Marquee ---------- */}
        <div className={styles.marquee} aria-label="Toolkit">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((n) => (
              <span key={n} aria-hidden={n === 1}>
                {toolkit.map((t) => (
                  <span key={t} className={styles.marqueeItem}>
                    {t} <span className={styles.star}>✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.container}>
          {/* ---------- Work ---------- */}
          <section id="work" className={styles.section}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                Stuff I&apos;ve <span className={styles.squiggle}>shipped</span>
              </h2>
            </Reveal>

            <ol className={styles.projects}>
              {projects.map((p, i) => {
                const Demo = DEMOS[p.demo];
                return (
                  <li key={p.slug}>
                    <Reveal>
                      <article className={styles.card} style={{ background: CARD_COLORS[i % CARD_COLORS.length] }}>
                        <div className={styles.cardText}>
                          <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
                          <h3 className={styles.cardTitle}>{p.title}</h3>
                          <p className={styles.cardKind}>{p.kind}</p>
                          <p className={styles.cardSummary}>{p.summary}</p>

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

                          <div className={styles.cardLinks}>
                            {p.live && <External href={p.live}>Live site</External>}
                            {p.code && <External href={p.code}>Code</External>}
                          </div>
                        </div>
                        <div className={styles.cardDemo}>
                          <Demo />
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>

            <Reveal>
              <div className={styles.building}>
                <p className={styles.buildingLabel}>
                  <span className={styles.spinner} aria-hidden="true" /> Cooking right now
                </p>
                <div className={styles.buildingGrid}>
                  {buildingNow.map((b) => (
                    <a key={b.title} href={b.href} target="_blank" rel="noopener noreferrer" className={styles.buildingCard}>
                      <span className={styles.buildingTitle}>
                        {b.title} <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                      <span>{b.summary}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ---------- Experience ---------- */}
          <section id="experience" className={styles.section}>
            <Reveal>
              <h2 className={styles.sectionTitle}>Where I&apos;ve been</h2>
            </Reveal>
            <Reveal>
              <div className={styles.roles}>
                {experience.map((r, i) => (
                  <details key={r.role} className={styles.role} open={i === 0}>
                    <summary>
                      <span className={styles.roleName}>{r.role}</span>
                      <span className={styles.roleOrg}>{r.org}</span>
                      <span className={styles.rolePeriod}>{r.period}</span>
                      <span className={styles.plus} aria-hidden="true">+</span>
                    </summary>
                    <div className={styles.roleBody}>
                      <ul>
                        {r.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      <p>
                        {r.place}
                        {r.orgUrl && (
                          <>
                            {" · "}
                            <a href={r.orgUrl} target="_blank" rel="noopener noreferrer">
                              website ↗
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className={styles.extras}>
                {extras.map((e, i) => (
                  <p key={e} className={styles.extra} style={{ background: i === 0 ? "var(--sky)" : "var(--lime)" }}>
                    {i === 0 ? "🏆 " : "🗣️ "}
                    {e}
                  </p>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ---------- Terminal ---------- */}
          <section className={styles.section}>
            <Reveal>
              <h2 className={styles.sectionTitle}>Or just poke around ↓</h2>
            </Reveal>
            <Reveal>
              <div className={styles.terminalWrap}>
                <Terminal />
              </div>
            </Reveal>
          </section>
        </div>

        {/* ---------- Contact ---------- */}
        <section id="contact" className={styles.contact}>
          <div className={styles.container}>
            <Reveal>
              <h2 className={styles.contactTitle}>
                Let&apos;s build
                <br />
                something.
              </h2>
              <p className={styles.contactLead}>
                Hiring for an internship, or have an idea worth building? My inbox is open.
              </p>
              <div className={styles.contactEmail}>
                <CopyEmail email={profile.email} />
              </div>
              <div className={styles.contactLinks}>
                <External href={links.calendly}>Book a call</External>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.pill}>
                  <LinkedInIcon size={15} /> LinkedIn
                </a>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.pill}>
                  <GithubIcon size={15} /> GitHub
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>
            © {new Date().getFullYear()} {profile.name} · made in Edmonton
          </span>
          <span className={styles.footerLinks}>
            <Link href="/blogs">Blog</Link>
            <Link href="/freelancing">Freelancing</Link>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={links.coffee} target="_blank" rel="noopener noreferrer">Buy me a coffee</a>
          </span>
        </div>
      </footer>
    </>
  );
}
