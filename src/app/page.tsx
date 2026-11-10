import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
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

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className={styles.sectionHead}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </Reveal>
  );
}

export default function Home() {
  const [before, highlight, after] = profile.headline;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.wordmark}>
            {profile.shortName}
            <span className={styles.wordmarkDot} aria-hidden="true" />
          </a>
          <nav className={styles.nav} aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top" className={styles.main}>
        {/* Intro */}
        <section className={styles.hero}>
          <div className={styles.identity}>
            <span className={styles.avatarWrap}>
              <Image
                src="/pranav-profile.jpg"
                alt={profile.name}
                width={64}
                height={64}
                className={styles.avatar}
                priority
              />
              <span className={styles.avatarStatus} aria-hidden="true" />
            </span>
            <div>
              <p className={styles.hello}>
                Hi, I&apos;m Pranav <span className={styles.wave} aria-hidden="true">👋</span>
              </p>
              <p className={styles.muted}>
                <LocalTime />
              </p>
            </div>
          </div>

          <h1 className={styles.headline}>
            {before}
            <span className={styles.highlight}>
              {highlight}
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 9 C 40 2, 80 2, 110 6 S 170 11, 198 4" />
              </svg>
            </span>
            {after}
          </h1>
          <p className={styles.lede}>{profile.intro}</p>

          <div className={styles.heroFoot}>
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              {profile.availability}
            </span>
            <span className={styles.nowChip}>
              <span className={styles.nowLabel}>now</span> {profile.now}
            </span>
          </div>

          <div className={styles.heroCtas}>
            <a href="#contact" className={styles.primaryCta}>
              Get in touch
            </a>
            <a href="#work" className={styles.ghostCta}>
              See what I&apos;ve built ↓
            </a>
          </div>
        </section>

        {/* Selected work */}
        <section id="work" className={styles.section}>
          <SectionHead kicker="Selected work" title="Things I've shipped" />

          <ol className={styles.projects}>
            {projects.map((p, i) => {
              const Demo = DEMOS[p.demo];
              return (
                <li key={p.slug}>
                  <Reveal className={styles.project}>
                    <div className={styles.projectText}>
                      <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 className={styles.projectTitle}>{p.title}</h3>
                      <p className={styles.kind}>{p.kind}</p>
                      <p className={styles.summary}>{p.summary}</p>

                      {p.metrics && (
                        <dl className={styles.metrics}>
                          {p.metrics.map((m) => (
                            <div key={m.label}>
                              <dt>{m.label}</dt>
                              <dd>{m.value}</dd>
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
                        {p.live && <External href={p.live}>Live site</External>}
                        {p.code && <External href={p.code}>Code</External>}
                      </div>
                    </div>

                    <div className={styles.demo}>
                      <Demo />
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal className={styles.building}>
            <h3 className={styles.kicker}>Building now</h3>
            <ul>
              {buildingNow.map((b) => (
                <li key={b.title}>
                  <a href={b.href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.buildingTitle}>
                      <span className={styles.wip} aria-hidden="true" />
                      {b.title}
                    </span>
                    <span className={styles.muted}>{b.summary}</span>
                    <ArrowUpRight size={14} aria-hidden="true" className={styles.buildingArrow} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Experience */}
        <section id="experience" className={styles.section}>
          <SectionHead kicker="Experience" title="Where I've been" />
          <Reveal className={styles.roles}>
            {experience.map((r, i) => (
              <details key={r.role} className={styles.role} open={i === 0}>
                <summary>
                  <span className={styles.roleName}>{r.role}</span>
                  <span className={styles.roleOrg}>{r.org}</span>
                  <span className={styles.rolePeriod}>{r.period}</span>
                  <span className={styles.chevron} aria-hidden="true">+</span>
                </summary>
                <div className={styles.roleBody}>
                  <ul>
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <p className={styles.muted}>
                    {r.place}
                    {r.orgUrl && (
                      <>
                        {" · "}
                        <External href={r.orgUrl}>Website</External>
                      </>
                    )}
                  </p>
                </div>
              </details>
            ))}
          </Reveal>

          <div className={styles.twoCol}>
            <Reveal>
              <h3 className={styles.kicker}>Toolkit</h3>
              <ul className={styles.tags}>
                {toolkit.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className={styles.kicker}>Also</h3>
              <ul className={styles.extras}>
                {extras.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Terminal */}
        <section className={styles.section}>
          <SectionHead kicker="Poke around" title="Prefer a terminal?" />
          <Reveal>
            <Terminal />
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <SectionHead kicker="Contact" title="Let's build something." />
          <Reveal>
            <p className={styles.contactLead}>
              Hiring for an internship, or have an idea worth building? My inbox is open.
            </p>
            <CopyEmail email={profile.email} />
            <div className={styles.contactLinks}>
              <External href={links.calendly}>Book a call</External>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                <LinkedInIcon size={14} /> LinkedIn
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                <GithubIcon size={14} /> GitHub
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © {new Date().getFullYear()} {profile.name} · made in Edmonton
        </span>
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
