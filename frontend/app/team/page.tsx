"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type Member = {
  name: string;
  role: string;
  initials: string;
};

type Team = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  members: Member[];
};

const makeMember = (name: string, role: string): Member => ({
  name,
  role,
  initials: name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
});

const founder = makeMember("Himanshu Shekhawat", "Founder");

const teams: Team[] = [
  {
    id: "tech",
    name: "Tech Team",
    icon: "💻",
    description: "Building and improving the UnivGeeks platform.",
    color: "#2563eb",
    members: [
      makeMember("Anshuman Ojha", "Tech Team"),
      makeMember("Avni Sonava", "Tech Team"),
      makeMember("Kapil Saini", "Tech Team"),
      makeMember("Navya Bhawsar", "Tech Team"),
      makeMember("Himesh Vaishnav", "Tech Team"),
      makeMember("Mohit Suthar", "Tech Team"),
      makeMember("Shivani Gehlot", "Tech Team"),
    ],
  },
  {
    id: "notes",
    name: "Notes Team",
    icon: "📚",
    description: "Making study material easier to access.",
    color: "#059669",
    members: [
      makeMember("Sonu Regar", "Notes Team"),
      makeMember("Ritul Verma", "Notes Team"),
      makeMember("Rakshit Kaler", "Notes Team"),
    ],
  },
  {
    id: "media",
    name: "Media Team",
    icon: "🎨",
    description: "Bringing ideas to life through creative content.",
    color: "#db2777",
    members: [
      makeMember("Lakshay Hada", "Media Team"),
      makeMember("Mohammad Maquil", "Media Team"),
      makeMember("Vanshika Joshi", "Media Team"),
      makeMember("Shivraj Katariya", "Media Team"),
      makeMember("Amit Choudhary", "Media Team"),
      makeMember("Omprakash Jaat", "Media Team"),
      makeMember("Devansh Khandelwal","Media Team"),
    ],
  },
  {
    id: "core",
    name: "Core Team",
    icon: "⚡",
    description: "Coordinating people, ideas and community activities.",
    color: "#7c3aed",
    members: [
      makeMember("Jyoti Shekhawat", "Core Team"),
      makeMember("Aayu Daukiva", "Core Team"),
      makeMember("Varaha Bohra", "Core Team"),
      makeMember("Dilkhush Khoja", "Core Team"),
      makeMember("Yashvardhan Singh Rathore", "Core Team"),
      makeMember("Arush Kumar Bhardwaj", "Core Team"),
      makeMember("Saumy Sharma", "Core Team"),
      makeMember("Vishnu Sharma", "Core Team"),
    ],
  },
];

const totalMembers = teams.reduce(
  (total, team) => total + team.members.length,
  0
);

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`team-reveal ${visible ? "team-reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function MemberCard({
  member,
  color,
  index,
}: {
  member: Member;
  color: string;
  index: number;
}) {
  return (
    <Reveal delay={(index % 4) * 90}>
      <article
        className="member-card"
        style={{ "--member-color": color } as CSSProperties}
      >
        <div className="member-avatar">{member.initials}</div>
        <h3>{member.name}</h3>
        <p>{member.role}</p>
        <div className="member-underline" />
      </article>
    </Reveal>
  );
}

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTeams = teams
    .filter((team) => activeFilter === "all" || team.id === activeFilter)
    .map((team) => ({
      ...team,
      members: team.members.filter((member) =>
        `${member.name} ${member.role}`
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      ),
    }))
    .filter((team) => team.members.length > 0);

  return (
    <main className="teams-page">
      <style>{`
        .teams-page {
          min-height: 100vh;
          background: #ffffff;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
        }

        .teams-page * { box-sizing: border-box; }
        .teams-page a { text-decoration: none; }

        .team-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 7%;
          border-bottom: 1px solid #e8edf5;
          background: #ffffff;
        }

        .team-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #172033;
          letter-spacing: -.7px;
        }

        .team-logo span { color: #2563eb; }

        .team-nav-links {
          display: flex;
          align-items: center;
          gap: 27px;
        }

        .team-nav-links a {
          color: #475569;
          font-size: .95rem;
          transition: color .25s ease;
        }

        .team-nav-links a:hover,
        .team-nav-links .current {
          color: #2563eb;
        }

        .team-hero {
          position: relative;
          isolation: isolate;
          padding: 95px 20px 65px;
          text-align: center;
          background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
        }

        .team-hero::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          left: calc(50% - 180px);
          width: 360px;
          height: 260px;
          border-radius: 50%;
          background: #60a5fa30;
          filter: blur(80px);
          animation: teamGlow 5s ease-in-out infinite alternate;
        }

        .team-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          border: 1px solid #bfdbfe;
          border-radius: 50px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: 1px;
          animation: teamFadeDown .7s ease both;
        }

        .team-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2563eb;
        }

        .team-hero h1 {
          margin: 24px 0 16px;
          font-size: clamp(2.7rem, 7vw, 5rem);
          line-height: 1.1;
          letter-spacing: -2px;
          color: #111827;
          animation: teamFadeUp .8s .1s ease both;
        }

        .team-gradient {
          color: #2563eb;
        }

        .team-hero > p {
          max-width: 660px;
          margin: 0 auto;
          color: #64748b;
          font-size: 1.05rem;
          line-height: 1.8;
          animation: teamFadeUp .8s .2s ease both;
        }

        .team-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 28px;
          animation: teamFadeUp .8s .3s ease both;
        }

        .team-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 21px;
          border: 1px solid transparent;
          border-radius: 9px;
          font-size: .93rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform .25s ease, background .25s ease,
            box-shadow .25s ease;
        }

        .team-btn:hover { transform: translateY(-3px); }

        .team-btn-primary {
          background: #2563eb;
          color: #ffffff !important;
          box-shadow: 0 5px 15px #2563eb20;
        }

        .team-btn-primary:hover {
          background: #1d4ed8;
          box-shadow: 0 8px 22px #2563eb35;
        }

        .team-btn-secondary {
          border-color: #cbd5e1;
          background: #ffffff;
          color: #334155 !important;
        }

        .team-btn-secondary:hover { background: #f8fafc; }

        .team-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 720px;
          margin: 45px auto 0;
          border: 1px solid #dbeafe;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 8px 30px #1e40af0a;
          animation: teamFadeUp .8s .4s ease both;
        }

        .team-stat { padding: 21px 10px; }

        .team-stat + .team-stat {
          border-left: 1px solid #e2e8f0;
        }

        .team-stat strong {
          display: block;
          color: #2563eb;
          font-size: 2rem;
          font-weight: 800;
        }

        .team-stat span {
          display: block;
          margin-top: 5px;
          color: #64748b;
          font-size: .86rem;
        }

        .teams-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 25px 85px;
        }

        .team-section-heading {
          margin: 50px 0 30px;
          text-align: center;
        }

        .team-section-kicker {
          color: #2563eb;
          font-size: .8rem;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .team-section-heading h2 {
          margin: 12px 0;
          color: #111827;
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -1px;
        }

        .team-section-heading p {
          max-width: 620px;
          margin: 0 auto;
          color: #64748b;
          line-height: 1.8;
        }

        .founder-wrap {
          max-width: 480px;
          margin: 0 auto 70px;
        }

        .founder-card {
          padding: 30px 24px;
          border: 1px solid #bfdbfe;
          border-radius: 16px;
          background: linear-gradient(145deg, #ffffff, #eff6ff);
          text-align: center;
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .founder-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px #2563eb14;
        }

        .founder-label {
          display: inline-block;
          padding: 7px 13px;
          border-radius: 50px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: .78rem;
          font-weight: 800;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        .founder-avatar {
          display: grid;
          place-items: center;
          width: 88px;
          height: 88px;
          margin: 20px auto;
          border: 3px solid #bfdbfe;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #60a5fa);
          color: #ffffff;
          font-size: 1.7rem;
          font-weight: 800;
          box-shadow: 0 5px 18px #2563eb25;
        }

        .founder-card h3 {
          margin: 0 0 8px;
          color: #172033;
          font-size: 1.4rem;
        }

        .founder-card p {
          margin: 0;
          color: #64748b;
        }

        .team-tools {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 30px;
        }

        .team-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .team-filter {
          padding: 9px 15px;
          border: 1px solid #dbe3ef;
          border-radius: 50px;
          background: #ffffff;
          color: #475569;
          font-size: .88rem;
          cursor: pointer;
          transition: all .2s ease;
        }

        .team-filter:hover {
          border-color: #93c5fd;
          color: #2563eb;
        }

        .team-filter.active {
          border-color: #2563eb;
          background: #2563eb;
          color: #ffffff;
        }

        .team-search {
          width: 250px;
          max-width: 100%;
          padding: 11px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          outline: none;
          background: #ffffff;
          color: #172033;
          font-size: .9rem;
        }

        .team-search::placeholder { color: #94a3b8; }

        .team-search:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px #dbeafe;
        }

        .team-group {
          margin-top: 42px;
          scroll-margin-top: 25px;
        }

        .team-group-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .team-icon {
          display: grid;
          place-items: center;
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #f8fafc;
          font-size: 1.4rem;
        }

        .team-group-header h3 {
          margin: 0 0 5px;
          color: #172033;
          font-size: 1.4rem;
        }

        .team-group-header p {
          margin: 0;
          color: #64748b;
          font-size: .91rem;
          line-height: 1.6;
        }

        .member-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
        }

        .member-card {
          position: relative;
          height: 100%;
          min-height: 190px;
          overflow: hidden;
          padding: 24px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
          text-align: center;
          transition: transform .28s ease, border-color .28s ease,
            box-shadow .28s ease;
        }

        .member-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--member-color);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .3s ease;
        }

        .member-card:hover {
          transform: translateY(-5px);
          border-color: #bfdbfe;
          box-shadow: 0 12px 28px #1e40af0d;
        }

        .member-card:hover::before { transform: scaleX(1); }

        .member-avatar {
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          border: 1px solid #dbeafe;
          border-radius: 50%;
          background: #eff6ff;
          color: var(--member-color);
          font-size: 1rem;
          font-weight: 800;
          transition: transform .25s ease;
        }

        .member-card:hover .member-avatar {
          transform: scale(1.06);
        }

        .member-card h3 {
          margin: 0 0 8px;
          color: #172033;
          font-size: 1rem;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .member-card p {
          margin: 0;
          color: #64748b;
          font-size: .84rem;
        }

        .member-underline {
          width: 28px;
          height: 3px;
          margin: 17px auto 0;
          border-radius: 50px;
          background: var(--member-color);
          opacity: .7;
        }

        .team-empty {
          padding: 35px 20px;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          color: #64748b;
          text-align: center;
        }

        .team-cta {
          margin-top: 80px;
          padding: 48px 24px;
          border: 1px solid #bfdbfe;
          border-radius: 17px;
          background: linear-gradient(135deg, #eff6ff, #ffffff);
          text-align: center;
        }

        .team-cta h2 {
          margin: 12px 0;
          color: #172033;
          font-size: clamp(1.9rem, 4vw, 2.7rem);
        }

        .team-cta p {
          max-width: 620px;
          margin: 0 auto;
          color: #64748b;
          line-height: 1.8;
        }

        .team-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
          padding: 25px 7%;
          border-top: 1px solid #e8edf5;
          background: #ffffff;
          color: #64748b;
          font-size: .87rem;
        }

        .team-footer .team-logo { font-size: 1.3rem; }

        .team-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .team-footer-links a:hover { color: #2563eb; }

        /* About Us-style reveal animations */
        .team-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .7s ease, transform .7s ease;
        }

        .team-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes teamFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes teamFadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes teamGlow {
          from { opacity: .45; transform: scale(.9); }
          to { opacity: 1; transform: scale(1.08); }
        }

        @media (max-width: 900px) {
          .member-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .team-navbar { padding-right: 5%; padding-left: 5%; }
          .teams-content { padding-right: 5%; padding-left: 5%; }
        }

        @media (max-width: 640px) {
          .team-navbar { padding: 17px 5%; }
          .team-logo { font-size: 1.2rem; }
          .team-nav-links { gap: 14px; font-size: .83rem; }
          .team-hero { padding: 70px 17px 50px; }
          .team-hero h1 { letter-spacing: -1.3px; }
          .team-hero > p { font-size: .97rem; }
          .team-stat { padding: 17px 5px; }
          .team-stat strong { font-size: 1.65rem; }
          .team-stat span { font-size: .73rem; }
          .teams-content { padding: 12px 16px 55px; }
          .team-tools { align-items: stretch; }
          .team-search { width: 100%; }
          .member-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
          .member-card { min-height: 180px; padding: 20px 9px; }
          .team-filter { padding: 8px 11px; font-size: .81rem; }
          .team-cta { margin-top: 55px; padding: 36px 17px; }
          .team-footer { flex-direction: column; text-align: center; }
        }

        @media (max-width: 360px) {
          .team-nav-links { gap: 9px; font-size: .77rem; }
          .member-grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .teams-page *, .teams-page *::before, .teams-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }

          .team-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <Navbar />

      <section className="team-hero">
        <div className="team-eyebrow">
          <span className="team-eyebrow-dot" />
          THE PEOPLE BEHIND UNIVGEEKS
        </div>

        <h1>
          Meet the <span className="team-gradient">Team</span>
        </h1>

        <p>
          Meet the passionate people working behind UnivGeeks to make learning
          resources more accessible and the student community stronger.
        </p>

        <div className="team-actions">
          <a href="#our-teams" className="team-btn team-btn-primary">
            Explore Our Teams ↓
          </a>
        </div>

        <div className="team-stats">
          <div className="team-stat">
            <strong>{totalMembers}+</strong>
            <span>Team Members</span>
          </div>
          <div className="team-stat">
            <strong>{teams.length}</strong>
            <span>Teams</span>
          </div>
          <div className="team-stat">
            <strong>1</strong>
            <span>One Community</span>
          </div>
        </div>
      </section>

      <div className="teams-content">
        <Reveal>
          <div className="team-section-heading">
            <div className="team-section-kicker">Leadership</div>
            <h2>
              The <span className="team-gradient">Founder</span>
            </h2>
            <p>
              The person whose vision helped bring the UnivGeeks community to
              life.
            </p>
          </div>
        </Reveal>

        <div className="founder-wrap">
          <Reveal delay={100}>
            <article className="founder-card">
              <div className="founder-label">✦ Founder</div>
              <div className="founder-avatar">{founder.initials}</div>
              <h3>{founder.name}</h3>
              <p>{founder.role} · UnivGeeks</p>
            </article>
          </Reveal>
        </div>

        <section id="our-teams">
          <Reveal>
            <div className="team-section-heading">
              <div className="team-section-kicker">Meet The People</div>
              <h2>
                Our <span className="team-gradient">Teams</span>
              </h2>
              <p>
                Different skills, one shared goal. Meet the people contributing
                to the UnivGeeks community.
              </p>
            </div>
          </Reveal>

          <div className="team-tools">
            <div className="team-filters">
              {[
                { id: "all", label: "All Teams" },
                { id: "tech", label: "Tech" },
                { id: "notes", label: "Notes" },
                { id: "media", label: "Media" },
                { id: "core", label: "Core" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`team-filter ${
                    activeFilter === filter.id ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <input
              type="search"
              className="team-search"
              placeholder="Search team members..."
              aria-label="Search team members"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <section className="team-group" key={team.id}>
                <Reveal>
                  <div className="team-group-header">
                    <div className="team-icon">{team.icon}</div>
                    <div>
                      <h3>{team.name}</h3>
                      <p>{team.description}</p>
                    </div>
                  </div>
                </Reveal>

                <div className="member-grid">
                  {team.members.map((member, index) => (
                    <MemberCard
                      key={member.name}
                      member={member}
                      color={team.color}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="team-empty">
              No team members found. Try a different name or filter.
            </div>
          )}
        </section>

        <Reveal>
          <section className="team-cta">
            <div className="team-section-kicker">Be Part Of Something</div>
            <h2>
              Grow with <span className="team-gradient">UnivGeeks</span>
            </h2>
            <p>
              Have an idea or a skill to share? Connect with the community and
              help make learning better for students.
            </p>

            <div className="team-actions">
              <Link href="/contact" className="team-btn team-btn-secondary">
                Contact Us →
              </Link>
            </div>
          </section>
        </Reveal>
      </div>

      <Footer />
    </main>
  );
}