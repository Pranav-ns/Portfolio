import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CopyEmail from "@/components/ui/CopyEmail";
import {
  buildingNow,
  experience,
  extras,
  links,
  profile,
  projects,
  toolkit,
} from "@/content/site";
import styles from "./page.module.css";

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.wordmark}>
            {profile.shortName}
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
            <Image
              src="/pranav-profile.jpg"
              alt={profile.name}
              width={56}
              height={56}
              className={styles.avatar}
              priority
            />
            <div>
              <p className={styles.name}>{profile.name}</p>
              <p className={styles.muted}>{profile.location}</p>
            </div>
          </div>

          <h1 className={styles.headline}>{profile.headline}</h1>
          <p className={styles.lede}>{profile.intro}</p>

          <div className={styles.heroFoot}>
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              {profile.availability}
            </span>
            <a href="#contact" className={styles.textLink}>
              Get in touch
            </a>
          </div>
        </section>

        {/* Selected work */}
        <section id="work" className={styles.section}>
          <h2 className={styles.sectionLabel}>Selected work</h2>

          <ol className={styles.projects}>
            {projects.map((p, i) => (
              <li key={p.slug} className={styles.project}>
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

                  <p className={styles.stack}>{p.stack.join(" · ")}</p>

                  <div className={styles.projectLinks}>
                    {p.live && <External href={p.live}>Live site</External>}
                    {p.code && <External href={p.code}>Code</External>}
                  </div>
                </div>

                <figure className={styles.trace} aria-label={`${p.title} ${p.trace.label}`}>
                  <figcaption>{p.trace.label}</figcaption>
                  <pre>{p.trace.lines.join("\n")}</pre>
                </figure>
              </li>
            ))}
          </ol>

          <div className={styles.building}>
            <h3 className={styles.subLabel}>Building now</h3>
            <ul>
              {buildingNow.map((b) => (
                <li key={b.title}>
                  <a href={b.href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.buildingTitle}>{b.title}</span>
                    <span className={styles.muted}>{b.summary}</span>
                    <ArrowUpRight size={14} aria-hidden="true" className={styles.buildingArrow} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className={styles.section}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <p className={styles.hint}>Tap a role for details.</p>
          <div className={styles.roles}>
            {experience.map((r, i) => (
              <details key={r.role} className={styles.role} open={i === 0}>
                <summary>
                  <span className={styles.roleName}>{r.role}</span>
                  <span className={styles.roleOrg}>{r.org}</span>
                  <span className={styles.rolePeriod}>{r.period}</span>
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
          </div>
        </section>

        {/* Toolkit + extras */}
        <section className={`${styles.section} ${styles.twoCol}`}>
          <div>
            <h2 className={styles.sectionLabel}>Toolkit</h2>
            <ul className={styles.tags}>
              {toolkit.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.sectionLabel}>Also</h2>
            <ul className={styles.extras}>
              {extras.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <h2 className={styles.sectionLabel}>Contact</h2>
          <p className={styles.contactLead}>
            Hiring for an internship, or have something worth building? Say hello.
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
