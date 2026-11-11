import Image from "next/image";
import Link from "next/link";
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

const CAPTIONS: Record<Project["demo"], string> = {
  status: "The ops board: page loads ticking under a two-second budget.",
  chat: "A question's path from sign-in to a recipe.",
  shelf: "From a photo of a shelf to what to read next.",
};

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.inline}>
      {children}
    </a>
  );
}

export default function Home() {
  const [before, highlight, after] = profile.headline;
  const year = new Date().getFullYear();

  return (
    <>
      {/* ---------- Masthead ---------- */}
      <header className={styles.masthead}>
        <div className={styles.mastInner}>
          <div className={styles.mastTop}>
            <span>Edmonton, Alberta</span>
            <span className={styles.mastClock}>
              <LocalTime />
            </span>
            <span>Open to internships</span>
          </div>
          <a href="#top" className={styles.title}>
            Pranav Namah Satish
          </a>
          <nav className={styles.mastNav} aria-label="Sections">
            <a href="#work">Selected work</a>
            <span aria-hidden="true">·</span>
            <a href="#experience">Experience</a>
            <span aria-hidden="true">·</span>
            <a href="#contact">Correspondence</a>
          </nav>
        </div>
      </header>

      <main id="top" className={styles.main}>
        {/* ---------- Lead story ---------- */}
        <section className={styles.lead}>
          <div className={styles.leadText}>
            <p className={styles.kicker}>The engineer</p>
            <h1 className={styles.headline}>
              {before}
              <em>{highlight}</em>
              {after}
            </h1>
            <div className={styles.columns}>
              <p className={styles.dropcap}>{profile.intro}</p>
              <p>
                Right now I&apos;m {profile.now.charAt(0).toLowerCase() + profile.now.slice(1)}, and
                looking for a 4, 8 or 12-month internship in software, cloud or AI/ML.{" "}
                <a href="#contact" className={styles.inline}>
                  Write to me
                </a>
                .
              </p>
            </div>
          </div>
          <figure className={styles.portrait}>
            <Image
              src="/pranav-profile.jpg"
              alt={profile.name}
              width={420}
              height={520}
              className={styles.photo}
              priority
            />
            <figcaption>Pranav, Computing Science (AI), University of Alberta.</figcaption>
          </figure>
        </section>

        {/* ---------- Selected work ---------- */}
        <section id="work" className={styles.section}>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2>Selected work</h2>
              <span>Three projects, in brief</span>
            </div>
          </Reveal>

          {projects.map((p, i) => {
            const Demo = DEMOS[p.demo];
            return (
              <Reveal key={p.slug}>
                <article className={`${styles.story} ${i % 2 ? styles.flip : ""}`}>
                  <div className={styles.storyText}>
                    <p className={styles.numeral}>№ {String(i + 1).padStart(2, "0")}</p>
                    <h3 className={styles.storyTitle}>{p.title}</h3>
                    <p className={styles.deck}>{p.kind}</p>
                    <p className={styles.body}>{p.summary}</p>
                    {p.metrics && (
                      <dl className={styles.figures}>
                        {p.metrics.map((m) => (
                          <div key={m.label}>
                            <dd>{m.value}</dd>
                            <dt>{m.label}</dt>
                          </div>
                        ))}
                      </dl>
                    )}
                    <p className={styles.byline}>Built with {p.stack.join(", ")}.</p>
                    <p className={styles.readMore}>
                      {p.live && <Ext href={p.live}>Visit the live site →</Ext>}
                      {p.code && <Ext href={p.code}>Read the source →</Ext>}
                    </p>
                  </div>
                  <figure className={styles.figure}>
                    <Demo />
                    <figcaption>
                      <span>Fig. {i + 1}.</span> {CAPTIONS[p.demo]} An animated sketch.
                    </figcaption>
                  </figure>
                </article>
              </Reveal>
            );
          })}

          <Reveal>
            <aside className={styles.works}>
              <h3>In the works</h3>
              <ul>
                {buildingNow.map((b) => (
                  <li key={b.title}>
                    <a href={b.href} target="_blank" rel="noopener noreferrer">
                      <strong>{b.title}.</strong> {b.summary}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </section>

        {/* ---------- Experience ---------- */}
        <section id="experience" className={styles.section}>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2>Experience</h2>
              <span>Select a role to read more</span>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.roles}>
              {experience.map((r, i) => (
                <details key={r.role} className={styles.role} open={i === 0}>
                  <summary>
                    <span className={styles.rolePeriod}>{r.period}</span>
                    <span className={styles.roleName}>{r.role}</span>
                    <span className={styles.roleOrg}>{r.org}</span>
                  </summary>
                  <div className={styles.roleBody}>
                    {r.points.map((pt) => (
                      <p key={pt}>{pt}</p>
                    ))}
                    <p className={styles.roleMeta}>
                      {r.place}
                      {r.orgUrl && (
                        <>
                          {" · "}
                          <Ext href={r.orgUrl}>website</Ext>
                        </>
                      )}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.notes}>
              <div>
                <h3>Toolkit</h3>
                <p>{toolkit.join(", ")}.</p>
              </div>
              <div>
                <h3>Also</h3>
                {extras.map((e) => (
                  <p key={e}>{e}.</p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- Appendix: terminal ---------- */}
        <section className={styles.section}>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2>Appendix</h2>
              <span>A terminal that works. Type help.</span>
            </div>
          </Reveal>
          <Reveal>
            <Terminal />
          </Reveal>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className={styles.contact}>
          <Reveal>
            <p className={styles.kicker}>Correspondence</p>
            <h2 className={styles.contactTitle}>
              Let&apos;s build <em>something.</em>
            </h2>
            <p className={styles.contactLead}>
              Hiring for an internship, or have an idea worth building? My inbox is open.
            </p>
            <div className={styles.email}>
              <CopyEmail email={profile.email} />
            </div>
            <p className={styles.contactLinks}>
              <Ext href={links.calendly}>Book a call</Ext>
              <Ext href={links.linkedin}>LinkedIn</Ext>
              <Ext href={links.github}>GitHub</Ext>
            </p>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © {year} {profile.name}. Set in Instrument Serif and Inter.
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
