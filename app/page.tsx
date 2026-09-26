"use client";

import { useState, FormEvent } from "react";

const notes = [
  {
    title: "Science Notes",
    text: "Physics, Chemistry, Mathematics & Biology",
    icon: "🔬",
  },
  {
    title: "Commerce Notes",
    text: "Accounts, Business Studies & Economics",
    icon: "📊",
  },
  {
    title: "Arts Notes",
    text: "History, Political Science & Humanities",
    icon: "📚",
  },
];

const pyqs = [
  {
    title: "Rajasthan Board PYQs",
    text: "RBSE Class 12 previous year question papers",
    icon: "📖",
  },
  {
    title: "Science PYQs",
    text: "PCM, PCB & PCMB previous year questions",
    icon: "🧪",
  },
  {
    title: "Commerce & Arts PYQs",
    text: "Practice previous year question papers",
    icon: "📝",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [streamOpen, setStreamOpen] = useState(false);
  const [scienceOpen, setScienceOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Login & Student Form
  const [loginOpen, setLoginOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentStream, setStudentStream] = useState("");

  // ================= SEARCH =================

  const handleSearch = () => {
    const value = search.trim().toLowerCase();

    if (!value) {
      alert("Please enter something to search.");
      return;
    }

    if (
      value.includes("note") ||
      value.includes("science") ||
      value.includes("commerce") ||
      value.includes("arts")
    ) {
      document
        .getElementById("notes")
        ?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    if (
      value.includes("pyq") ||
      value.includes("question") ||
      value.includes("paper")
    ) {
      document
        .getElementById("pyqs")
        ?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    if (
      value.includes("rajasthan") ||
      value.includes("rbse") ||
      value.includes("board")
    ) {
      document
        .getElementById("rbse")
        ?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    if (value.includes("contact")) {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    alert(`No result found for "${search}"`);
  };

  // ================= LOGIN =================

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password.");
      return;
    }

    alert(`Login submitted for ${loginEmail}`);

    setLoginEmail("");
    setLoginPassword("");
    setLoginOpen(false);
  };

  // ================= STUDENT FORM =================

  const handleStudentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !studentName ||
      !studentEmail ||
      !studentClass ||
      !studentStream
    ) {
      alert("Please fill all student details.");
      return;
    }

    alert(
      `Student Form submitted successfully for ${studentName}!`
    );

    setStudentName("");
    setStudentEmail("");
    setStudentClass("");
    setStudentStream("");
    setStudentOpen(false);
  };

  return (
    <main className={darkMode ? "dark-page" : "light-page"}>

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo-area">

          <img
            src="/logo.jpg"
            alt="UnivGeeks Logo"
            className="logo"
          />

          <span className="brand-name">
            UnivGeeks
          </span>

        </div>

        {/* NAV LINKS */}

        <div
          className={`nav-links ${
            menuOpen ? "mobile-show" : ""
          }`}
        >

          <a href="#home">Home</a>

          {/* STREAM DROPDOWN */}

          <div className="dropdown">

            <button
              className="nav-button"
              onClick={() =>
                setStreamOpen(!streamOpen)
              }
            >
                Streams <span>▾</span>
             
            </button>

            {streamOpen && (
              <div className="dropdown-menu">

                <div className="dropdown-title">
                  Class 12
                </div>

                {/* SCIENCE */}

                <div className="nested-dropdown">

                  <button
                    className="nested-button"
                    onClick={() =>
                      setScienceOpen(!scienceOpen)
                    }
                  >
                    Science <span>›</span>
                  </button>

                  {scienceOpen && (
                    <div className="nested-menu">
                      <a href="#streams">PCM</a>
                      <a href="#streams">PCB</a>
                      <a href="#streams">PCMB</a>
                    </div>
                  )}

                </div>

                <a href="#streams">
                  Commerce
                </a>

                <a href="#streams">
                  Arts
                </a>

              </div>
            )}

          </div>

          <a href="#notes">Notes</a>

          <a href="#pyqs">PYQs</a>

          <a href="#contact">Contact</a>

          {/* SEARCH */}

          <div className="search-box">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              onClick={handleSearch}
              aria-label="Search"
            >
              🔍
            </button>

          </div>

          {/* LOGIN */}

          <button
            className="login-btn"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </button>

          {/* STUDENT FORM */}

          <button
            className="student-btn"
            onClick={() => setStudentOpen(true)}
          >
            Student Form
          </button>

          {/* DARK MODE */}

          <button
            className="dark-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

        {/* MOBILE MENU */}

        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

      </nav>


      {/* ================= HERO ================= */}

      <section
        id="home"
        className="hero"
      >

        {/* FULL HERO IMAGE */}

        <img
          src="/educational.jpg"
          alt="Education"
          className="hero-image"
        />

        {/* OVERLAY */}

        <div className="hero-overlay"></div>

        {/* HERO CONTENT */}

        <div className="hero-content">

          <p className="hero-small">
            WELCOME TO UNIVGEEKS
          </p>

          <h1>
            Learn Today.
            <br />
            <span>
              Build Your Future.
            </span>
          </h1>

          <p className="hero-text">
            Your one place for Notes, PYQs and
            learning resources for Class 12.
          </p>

          <div className="hero-buttons">

            <a
              href="#notes"
              className="primary-btn"
            >
              Explore Notes
            </a>

            <a
              href="#pyqs"
              className="secondary-btn"
            >
              View PYQs
            </a>

          </div>

        </div>

      </section>


      {/* ================= STREAMS ================= */}

      <section
        id="streams"
        className="section"
      >

        <div className="section-heading">

          <p>CHOOSE YOUR PATH</p>

          <h2>
            Class 12 Streams
          </h2>

          <span>
            Explore your stream and start learning.
          </span>

        </div>

        <div className="stream-grid">

          {/* COMMERCE */}

          <div className="stream-card">

            <div className="card-icon">
              📊
            </div>

            <h3>
              Commerce
            </h3>

            <p>
              Accounts, Business Studies,
              Economics and more.
            </p>

            <button>
              Explore →
            </button>

          </div>


          {/* SCIENCE */}

          <div className="stream-card science-card">

            <div className="card-icon">
              🔬
            </div>

            <h3>
              Science
            </h3>

            <p>
              Choose your science combination.
            </p>

            <div className="subject-list">

              <span>PCM</span>
              <span>PCB</span>
              <span>PCMB</span>

            </div>

            <button>
              Explore →
            </button>

          </div>


          {/* ARTS */}

          <div className="stream-card">

            <div className="card-icon">
              🎨
            </div>

            <h3>
              Arts
            </h3>

            <p>
              History, Political Science,
              Geography and more.
            </p>

            <button>
              Explore →
            </button>

          </div>

        </div>

      </section>


      {/* ================= NOTES ================= */}

      <section
        id="notes"
        className="section notes-section"
      >

        <div className="section-heading">

          <p>STUDY SMART</p>

          <h2>
            Notes
          </h2>

          <span>
            Easy-to-understand study material
            for your preparation.
          </span>

        </div>

        <div className="resource-grid">

          {notes.map((note) => (

            <div
              className="resource-card"
              key={note.title}
            >

              <div className="resource-icon">
                {note.icon}
              </div>

              <h3>
                {note.title}
              </h3>

              <p>
                {note.text}
              </p>

              <button>
                View Notes →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ================= RBSE ================= */}

      <section
        id="rbse"
        className="rbse-section"
      >

        <div>

          <p className="rbse-small">
            SPECIAL RESOURCE
          </p>

          <h2>
            Rajasthan Board
          </h2>

          <p>
            Get RBSE Class 12 study material,
            notes and previous year questions
            in one place.
          </p>

          <button className="rbse-btn">
            Explore RBSE →
          </button>

        </div>

        <div className="rbse-symbol">

          <img
            src="/rbse-logo.png"
            alt="Rajasthan Board RBSE Logo"
          />

        </div>

      </section>


      {/* ================= PYQS ================= */}

      <section
        id="pyqs"
        className="section"
      >

        <div className="section-heading">

          <p>PRACTICE MORE</p>

          <h2>
            Previous Year Questions
          </h2>

          <span>
            Practice important questions and
            understand the exam pattern.
          </span>

        </div>

        <div className="resource-grid">

          {pyqs.map((pyq) => (

            <div
              className="resource-card"
              key={pyq.title}
            >

              <div className="resource-icon">
                {pyq.icon}
              </div>

              <h3>
                {pyq.title}
              </h3>

              <p>
                {pyq.text}
              </p>

              <button>
                View PYQs →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="contact-section"
      >

        <p>
          HAVE A QUESTION?
        </p>

        <h2>
          Start your learning journey
          with UnivGeeks.
        </h2>

        <button>
          Contact Us →
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-logo">

          <img
            src="/logo.jpg"
            alt="UnivGeeks"
          />

          <span>
            UnivGeeks
          </span>

        </div>

        <p>
          © 2026 UnivGeeks.
          Learn. Practice. Improve.
        </p>

      </footer>


      {/* ================= LOGIN MODAL ================= */}

      {loginOpen && (

        <div
          className="modal-overlay"
          onClick={() =>
            setLoginOpen(false)
          }
        >

          <form
            className="modal-form"
            onSubmit={handleLogin}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="close-modal"
              onClick={() =>
                setLoginOpen(false)
              }
            >
              ✕
            </button>

            <h2>
              Login
            </h2>

            <p>
              Login to your UnivGeeks account.
            </p>

            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) =>
                setLoginEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) =>
                setLoginPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="modal-submit"
            >
              Login
            </button>

          </form>

        </div>

      )}


      {/* ================= STUDENT FORM ================= */}

      {studentOpen && (

        <div
          className="modal-overlay"
          onClick={() =>
            setStudentOpen(false)
          }
        >

          <form
            className="modal-form student-modal"
            onSubmit={handleStudentSubmit}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="close-modal"
              onClick={() =>
                setStudentOpen(false)
              }
            >
              ✕
            </button>

            <h2>
              Student Form
            </h2>

            <p>
              Enter your details to continue.
            </p>

            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) =>
                setStudentName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={studentEmail}
              onChange={(e) =>
                setStudentEmail(e.target.value)
              }
            />

            <select
              value={studentClass}
              onChange={(e) =>
                setStudentClass(e.target.value)
              }
            >

              <option value="">
                Select Class
              </option>

              <option value="Class 10">
                Class 10
              </option>

              <option value="Class 11">
                Class 11
              </option>

              <option value="Class 12">
                Class 12
              </option>

            </select>

            <select
              value={studentStream}
              onChange={(e) =>
                setStudentStream(e.target.value)
              }
            >

              <option value="">
                Select Stream
              </option>

              <option value="Science">
                Science
              </option>

              <option value="Commerce">
                Commerce
              </option>

              <option value="Arts">
                Arts
              </option>

            </select>

            <button
              type="submit"
              className="modal-submit"
            >
              Submit Student Form
            </button>

          </form>

        </div>

      )}

    </main>
  );
}