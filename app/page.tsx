"use client";

import { useState } from "react";

const studyData = [
  {
    title: "Class 12 Science",
    category: "Science",
    description:
      "Physics, Chemistry, Mathematics, Biology and complete study material.",
  },
  {
    title: "PCM",
    category: "Science",
    description:
      "Physics, Chemistry and Mathematics notes and previous year questions.",
  },
  {
    title: "PCB",
    category: "Science",
    description:
      "Physics, Chemistry and Biology notes and previous year questions.",
  },
  {
    title: "Class 12 Commerce",
    category: "Commerce",
    description:
      "Accountancy, Business Studies, Economics and useful study material.",
  },
  {
    title: "Class 12 Arts",
    category: "Arts",
    description:
      "History, Political Science, Geography and other subjects.",
  },
  {
    title: "Study Notes",
    category: "Notes",
    description:
      "Easy-to-understand notes for better exam preparation.",
  },
  {
    title: "Previous Year Questions",
    category: "PYQs",
    description:
      "Practice previous year question papers and important questions.",
  },
];

export default function Home() {
  /* ---------------- STATES ---------------- */

  const [search, setSearch] = useState("");

  const [streamOpen, setStreamOpen] = useState(false);
  const [class12Open, setClass12Open] = useState(false);
  const [scienceOpen, setScienceOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const [darkMode, setDarkMode] = useState(false);

  /* ---------------- SEARCH ---------------- */

  const filteredData = studyData.filter((item) =>
    `${item.title} ${item.category} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ---------------- CHATBOT ---------------- */

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChatMessages((old) => [
      ...old,
      `You: ${userMessage}`,
    ]);

    setMessage("");

    setTimeout(() => {
      let reply =
        "UnivGeeks Bot: Hello! I can help you with Notes, PYQs and Streams.";

      const text = userMessage.toLowerCase();

      if (text.includes("hello") || text.includes("hi")) {
        reply =
          "UnivGeeks Bot: Hello 👋 How can I help you?";
      } else if (text.includes("science")) {
        reply =
          "UnivGeeks Bot: Science students can choose PCM or PCB.";
      } else if (text.includes("pcm")) {
        reply =
          "UnivGeeks Bot: PCM includes Physics, Chemistry and Mathematics.";
      } else if (text.includes("pcb")) {
        reply =
          "UnivGeeks Bot: PCB includes Physics, Chemistry and Biology.";
      } else if (text.includes("notes")) {
        reply =
          "UnivGeeks Bot: You can find useful study notes in the Notes section.";
      } else if (text.includes("pyq")) {
        reply =
          "UnivGeeks Bot: Previous Year Questions are available in the PYQs section.";
      } else if (text.includes("commerce")) {
        reply =
          "UnivGeeks Bot: Commerce includes Accountancy, Business Studies and Economics.";
      } else if (text.includes("arts")) {
        reply =
          "UnivGeeks Bot: Arts includes History, Geography and Political Science.";
      }

      setChatMessages((old) => [...old, reply]);
    }, 500);
  };

  /* ---------------- STUDENT FORM ---------------- */

  const submitStudentForm = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    alert(
      "Student Form submitted successfully! 🎉"
    );

    setShowForm(false);
  };

  /* ---------------- LOGIN ---------------- */

  const loginUser = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    alert("Login successful! 🎉");

    setShowLogin(false);
  };

  /* ---------------- JSX ---------------- */

  return (
    <main className={darkMode ? "darkMode" : ""}>

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        {/* LOGO */}

        <div className="logoBox">

          <img
            src="/logo.jpeg"
            alt="UnivGeeks Logo"
          />

          <b>
            Univ<span>Geeks</span>
          </b>

        </div>

        {/* NAV LINKS */}

        <div className="navLinks">

          <a href="#home">
            Home
          </a>

          {/* STREAM */}

          <div className="dropdown">

            <button
              className="navButton"
              onClick={() =>
                setStreamOpen(!streamOpen)
              }
            >
              Stream

              <span
                className={
                  streamOpen
                    ? "arrow rotate"
                    : "arrow"
                }
              >
                ▼
              </span>

            </button>

            {streamOpen && (

              <div className="dropdownMenu">

                {/* CLASS 12 */}

                <div className="subDropdown">

                  <button
                    onClick={() =>
                      setClass12Open(!class12Open)
                    }
                  >
                    Class 12

                    <span>
                      →
                    </span>
                  </button>

                  {class12Open && (

                    <div className="subMenu">

                      {/* SCIENCE */}

                      <div className="scienceDropdown">

                        <button
                          onClick={() =>
                            setScienceOpen(
                              !scienceOpen
                            )
                          }
                        >
                          Science

                          <span>
                            →
                          </span>

                        </button>

                        {scienceOpen && (

                          <div className="scienceMenu">

                            <a
                              href="#pcm"
                              onClick={() =>
                                setStreamOpen(
                                  false
                                )
                              }
                            >
                              PCM
                            </a>

                            <a
                              href="#pcb"
                              onClick={() =>
                                setStreamOpen(
                                  false
                                )
                              }
                            >
                              PCB
                            </a>

                          </div>

                        )}

                      </div>

                      {/* ARTS */}

                      <a
                        href="#arts"
                        onClick={() =>
                          setStreamOpen(false)
                        }
                      >
                        Arts
                      </a>

                      {/* COMMERCE */}

                      <a
                        href="#commerce"
                        onClick={() =>
                          setStreamOpen(false)
                        }
                      >
                        Commerce
                      </a>

                    </div>

                  )}

                </div>

              </div>

            )}

          </div>

          <a href="#notes">
            Notes
          </a>

          <a href="#pyqs">
            PYQs
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

        {/* RIGHT SIDE */}

        <div className="navActions">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* FORM */}

          <button
            onClick={() =>
              setShowForm(true)
            }
          >
            Student Form
          </button>

          {/* LOGIN */}

          <button
            onClick={() =>
              setShowLogin(true)
            }
          >
            Login
          </button>

          {/* DARK MODE */}

          <button
            className="themeButton"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </nav>

      {/* ================= SEARCH RESULTS ================= */}

      {search && (

        <section className="searchResults">

          <h2>
            Search Results
          </h2>

          <p>
            Results for "{search}"
          </p>

          {filteredData.length === 0 ? (

            <div className="noResults">
              ❌ No results found
            </div>

          ) : (

            <div className="cards">

              {filteredData.map(
                (item, index) => (

                  <div
                    className="card"
                    key={index}
                  >

                    <span className="category">
                      {item.category}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    <button>
                      Explore →
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      )}

      {/* ================= HERO ================= */}

      <section
        id="home"
        className="hero"
      >

        <div className="heroText">

          <p className="welcome">
            Welcome to UnivGeeks
          </p>

          <h1>
            Your Learning Journey
            <br />
            Starts Here
          </h1>

          <p>
            Notes, Previous Year Questions,
            study material and useful resources —
            everything students need in one place.
          </p>

          <div className="heroButtons">

            <button
              onClick={() =>
                setShowForm(true)
              }
            >
              Get Started
            </button>

            <a href="#pyqs">
              <button className="secondary">
                View PYQs
              </button>
            </a>

          </div>

        </div>

        {/* EDUCATION IMAGE */}

        <div className="heroImage">

          <img
            src="/education.jpg"
            alt="Education"
          />

        </div>

      </section>

      {/* ================= STREAM SECTION ================= */}

      <section className="section">

        <h2>
          Choose Your Stream
        </h2>

        <p>
          Select your stream and start learning.
        </p>

        <div className="cards">

          {/* SCIENCE */}

          <div
            className="card"
            id="pcm"
          >

            <div className="emoji">
              🔬
            </div>

            <h3>
              Science
            </h3>

            <p>
              Physics, Chemistry,
              Mathematics, Biology
              and more.
            </p>

            <div className="streamButtons">

              <a href="#pcm">
                <button>
                  PCM
                </button>
              </a>

              <a href="#pcb">
                <button>
                  PCB
                </button>
              </a>

            </div>

          </div>

          {/* COMMERCE */}

          <div
            className="card"
            id="commerce"
          >

            <div className="emoji">
              📊
            </div>

            <h3>
              Commerce
            </h3>

            <p>
              Accountancy,
              Business Studies,
              Economics and more.
            </p>

            <button>
              Explore →
            </button>

          </div>

          {/* ARTS */}

          <div
            className="card"
            id="arts"
          >

            <div className="emoji">
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

      {/* ================= PCB ================= */}

      <section
        id="pcb"
        className="infoSection"
      >

        <h2>
          Science — PCB
        </h2>

        <p>
          Physics • Chemistry • Biology
        </p>

      </section>

      {/* ================= NOTES ================= */}

      <section
        id="notes"
        className="section"
      >

        <h2>
          Study Notes
        </h2>

        <p>
          Easy-to-understand notes
          for better preparation.
        </p>

        <div className="cards">

          <div className="card">

            <h3>
              📚 Class 12 Notes
            </h3>

            <p>
              Complete study notes
              for Class 12 students.
            </p>

            <button>
              View Notes →
            </button>

          </div>

          <div className="card">

            <h3>
              📖 Subject Notes
            </h3>

            <p>
              Subject-wise notes
              for easy preparation.
            </p>

            <button>
              View Notes →
            </button>

          </div>

          <div className="card">

            <h3>
              ⭐ Important Topics
            </h3>

            <p>
              Important topics to
              help you prepare better.
            </p>

            <button>
              View Topics →
            </button>

          </div>

        </div>

      </section>

      {/* ================= PYQS ================= */}

      <section
        id="pyqs"
        className="section"
      >

        <h2>
          Previous Year Questions
        </h2>

        <p>
          Practice previous year questions
          and improve your preparation.
        </p>

        <div className="cards">

          <div className="card">

            <h3>
              📄 Class 12 PYQs
            </h3>

            <p>
              Previous year question
              papers for Class 12.
            </p>

            <button>
              View PYQs
            </button>

          </div>

          <div className="card">

            <h3>
              📘 Subject-wise PYQs
            </h3>

            <p>
              Find PYQs according
              to your subject.
            </p>

            <button>
              View PYQs
            </button>

          </div>

          <div className="card">

            <h3>
              🎯 Important Questions
            </h3>

            <p>
              Important questions
              for exam preparation.
            </p>

            <button>
              View Questions
            </button>

          </div>

        </div>

      </section>

      {/* ================= STUDENT FORM ================= */}

      {showForm && (

        <div className="modal">

          <div className="modalBox">

            <button
              className="close"
              onClick={() =>
                setShowForm(false)
              }
            >
              ×
            </button>

            <h2>
              Student Form
            </h2>

            <p>
              Enter your details to get started.
            </p>

            <form
              onSubmit={submitStudentForm}
            >

              <input
                required
                placeholder="Full Name"
              />

              <input
                required
                type="email"
                placeholder="Email Address"
              />

              <input
                required
                placeholder="Mobile Number"
              />

              <select required>

                <option value="">
                  Select Class
                </option>

                <option>
                  Class 12
                </option>

                <option>
                  Class 11
                </option>

              </select>

              <select required>

                <option value="">
                  Select Stream
                </option>

                <option>
                  Science
                </option>

                <option>
                  Commerce
                </option>

                <option>
                  Arts
                </option>

              </select>

              <button type="submit">
                Submit Form
              </button>

            </form>

          </div>

        </div>

      )}

      {/* ================= LOGIN ================= */}

      {showLogin && (

        <div className="modal">

          <div className="modalBox">

            <button
              className="close"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ×
            </button>

            <h2>
              Login
            </h2>

            <p>
              Login to your UnivGeeks account.
            </p>

            <form
              onSubmit={loginUser}
            >

              <input
                required
                type="email"
                placeholder="Email Address"
              />

              <input
                required
                type="password"
                placeholder="Password"
              />

              <button type="submit">
                Login
              </button>

            </form>

          </div>

        </div>

      )}

      {/* ================= CHATBOT ================= */}

      <button
        className="chatButton"
        onClick={() =>
          setShowChat(!showChat)
        }
      >
        💬
      </button>

      {showChat && (

        <div className="chatBox">

          <div className="chatHeader">

            <b>
              UnivGeeks Bot
            </b>

            <button
              onClick={() =>
                setShowChat(false)
              }
            >
              ×
            </button>

          </div>

          <div className="chatBody">

            {chatMessages.length === 0 && (

              <p className="botMessage">
                👋 Hello! I'm UnivGeeks Bot.
                <br />
                Ask me about Notes, PYQs,
                Science, PCM, PCB, Arts
                or Commerce.
              </p>

            )}

            {chatMessages.map(
              (msg, index) => (

                <p
                  className={
                    msg.startsWith("You:")
                      ? "userMessage"
                      : "botMessage"
                  }
                  key={index}
                >
                  {msg}
                </p>

              )
            )}

          </div>

          <div className="chatInput">

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  sendMessage();
                }

              }}
              placeholder="Type message..."
            />

            <button
              onClick={sendMessage}
            >
              ➤
            </button>

          </div>

        </div>

      )}

      {/* ================= FOOTER ================= */}

      <footer id="contact">

        <div>

          <h2>
            Univ<span>Geeks</span>
          </h2>

          <p>
            Learn • Prepare • Grow
          </p>

          <p>
            Your learning partner for
            better preparation.
          </p>

        </div>

        <div>

          <h3>
            Quick Links
          </h3>

          <a href="#home">
            Home
          </a>

          <a href="#notes">
            Notes
          </a>

          <a href="#pyqs">
            PYQs
          </a>

        </div>

        <div>

          <h3>
            Contact
          </h3>

          <p>
            📧 support@univgeeks.com
          </p>

          <p>
            📱 +91 XXXXX XXXXX
          </p>

        </div>

        <div className="copyright">

          © 2026 UnivGeeks.
          All Rights Reserved.

        </div>

      </footer>

    </main>
  );
}