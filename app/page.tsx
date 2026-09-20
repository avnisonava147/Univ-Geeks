"use client";

import { useState } from "react";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [streamOpen, setStreamOpen] = useState(false);
    const [scienceOpen, setScienceOpen] = useState(false);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
        setStreamOpen(false);
        setScienceOpen(false);
    };

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.reset();
    };

    return (
        <main className={darkMode ? "site dark" : "site"}>

            {/* HEADER */}
            <header className="header">
                <div className="header-inner">

                    <button className="logo" onClick={() => scrollTo("home")}>
                        <img src="/logo.jpg" alt="univGreeks Logo" />
                    </button>

                    <nav className="nav">

                        <button onClick={() => scrollTo("home")}>
                            Home
                        </button>

                        {/* STREAM */}
                        <div className="nav-dropdown">

                            <button
                                className="nav-button stream-toggle"
                                onClick={() => {
                                    setStreamOpen(!streamOpen);
                                    setScienceOpen(false);
                                }}
                            >
                                <span>Stream</span>
                                <span className={`stream-arrow ${streamOpen ? "open" : ""}`}>
                                    ▾
                                </span>
                            </button>



                            {streamOpen && (
                                <div className="dropdown-menu">

                                    <div className="dropdown-title">
                                        Class 12
                                    </div>

                                    <div className="science-dropdown">

                                        <button
                                            className="dropdown-item"
                                            onClick={() =>
                                                setScienceOpen(!scienceOpen)
                                            }
                                        >
                                            <span>Science</span>
                                            <span className="right-arrow">›</span>
                                        </button>

                                        {scienceOpen && (
                                            <div className="science-menu">

                                                <button onClick={() => scrollTo("streams")}>
                                                    PCM
                                                </button>

                                                <button onClick={() => scrollTo("streams")}>
                                                    PCB
                                                </button>

                                                <button onClick={() => scrollTo("streams")}>
                                                    PCMB
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                    <button
                                        className="dropdown-item"
                                        onClick={() => scrollTo("streams")}
                                    >
                                        Arts
                                    </button>

                                    <button
                                        className="dropdown-item"
                                        onClick={() => scrollTo("streams")}
                                    >
                                        Commerce
                                    </button>

                                </div>
                            )}

                        </div>

                        <button onClick={() => scrollTo("pyqs")}>
                            PYQs
                        </button>

                        <button onClick={() => scrollTo("notes")}>
                            Notes
                        </button>

                        <button onClick={() => scrollTo("contact")}>
                            Contact
                        </button>

                        <button onClick={() => setSearchOpen(!searchOpen)}>
                            🔍 Search
                        </button>

                        <button onClick={() => scrollTo("student-form")}>
                            Student Form
                        </button>

                    </nav>

                    <div className="header-actions">

                        <button
                            className="dark-button"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                        <button
                            className="login-button"
                            onClick={() => setLoginOpen(true)}
                        >
                            Login
                        </button>

                    </div>

                </div>
            </header>


            {/* SEARCH */}
            {searchOpen && (
                <div className="search-area">

                    <div className="search-box">
                        <span>🔎</span>

                        <input
                            type="text"
                            placeholder="Search notes, PYQs, Science, PCM, PCB, PCMB..."
                            autoFocus
                        />
                    </div>

                </div>
            )}


            {/* HERO / BANNER */}
            <section id="home" className="hero">

                <div className="hero-image"></div>

                <div className="hero-overlay"></div>

                <div className="hero-content">

                    <span className="welcome">
                        WELCOME TO UNIVGREEKS
                    </span>

                    <h1>
                        Your Learning
                        <br />
                        <span>Journey Starts Here</span>
                    </h1>

                    <p>
                        Learn smarter with notes, previous year questions,
                        important topics and useful study material.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-button"
                            onClick={() => scrollTo("streams")}
                        >
                            Explore Streams
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => scrollTo("notes")}
                        >
                            Study Notes
                        </button>

                    </div>

                </div>

            </section>


            {/* STREAM */}
            <section id="streams" className="section">

                <div className="section-title">

                    <span>CLASS 12</span>

                    <h2>Choose Your Stream</h2>

                    <p>Select your stream and start learning.</p>

                </div>

                <div className="stream-grid">

                    <div className="stream-card">

                        <div className="stream-icon">🎨</div>

                        <h3>Arts</h3>

                        <p>
                            History, Political Science,
                            Geography, Sociology and more.
                        </p>

                        <button className="card-button">
                            Arts
                        </button>

                    </div>


                    <div className="stream-card">

                        <div className="stream-icon">🔬</div>

                        <h3>Science</h3>

                        <p>Choose your Science combination.</p>

                        <div className="science-buttons">

                            <button className="card-button">PCM</button>

                            <button className="card-button">PCB</button>

                            <button className="card-button">PCMB</button>

                        </div>

                    </div>


                    <div className="stream-card">

                        <div className="stream-icon">📊</div>

                        <h3>Commerce</h3>

                        <p>
                            Accountancy, Business Studies,
                            Economics and more.
                        </p>

                        <button className="card-button">
                            Commerce
                        </button>

                    </div>

                </div>

            </section>


            {/* PYQs */}
            <section id="pyqs" className="section">

                <div className="section-title">

                    <span>PRACTICE</span>

                    <h2>Previous Year Questions</h2>

                    <p>
                        Practice PYQs for better exam preparation.
                    </p>

                </div>

                <div className="three-grid">

                    <div className="info-card">
                        <div className="info-icon">📚</div>
                        <h3>Class 12 PYQs</h3>
                        <p>Previous year questions for Class 12.</p>
                        <button className="card-button">Explore</button>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">📝</div>
                        <h3>Subject-wise PYQs</h3>
                        <p>Find questions according to subject.</p>
                        <button className="card-button">Explore</button>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">⭐</div>
                        <h3>Important Questions</h3>
                        <p>Practice important exam questions.</p>
                        <button className="card-button">Explore</button>
                    </div>

                </div>

            </section>


            {/* NOTES */}
            <section id="notes" className="section">

                <div className="section-title">

                    <span>STUDY MATERIAL</span>

                    <h2>Study Notes</h2>

                    <p>Easy-to-understand notes for students.</p>

                </div>

                <div className="three-grid">

                    <div className="info-card">
                        <div className="info-icon">📖</div>
                        <h3>Class 12 Notes</h3>
                        <p>Easy notes for Class 12 students.</p>
                        <button className="card-button">View Notes</button>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">📘</div>
                        <h3>Subject Notes</h3>
                        <p>Subject-wise study material.</p>
                        <button className="card-button">View Notes</button>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">💡</div>
                        <h3>Important Topics</h3>
                        <p>Quick revision of important topics.</p>
                        <button className="card-button">View Notes</button>
                    </div>

                </div>

            </section>


            {/* STUDENT FORM */}
            <section id="student-form" className="section form-section">

                <div className="section-title">

                    <span>REGISTRATION</span>

                    <h2>Student Form</h2>

                    <p>Enter your details to continue.</p>

                </div>

                <form className="student-form" onSubmit={handleForm}>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                            />

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>Mobile Number</label>

                            <input
                                type="tel"
                                placeholder="Enter mobile number"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Class</label>

                            <select required defaultValue="">

                                <option value="" disabled>
                                    Select Class
                                </option>

                                <option>Class 10</option>
                                <option>Class 11</option>
                                <option>Class 12</option>
                                <option>College</option>

                            </select>

                        </div>

                    </div>


                    <div className="form-group">

                        <label>Stream</label>

                        <select required defaultValue="">

                            <option value="" disabled>
                                Select Stream
                            </option>

                            <option>Science - PCM</option>
                            <option>Science - PCB</option>
                            <option>Science - PCMB</option>
                            <option>Arts</option>
                            <option>Commerce</option>

                        </select>

                    </div>


                    <button
                        type="submit"
                        className="primary-button submit-button"
                    >
                        Submit Form
                    </button>

                </form>

            </section>


            {/* CONTACT */}
            <section id="contact" className="contact-section">

                <div>

                    <span>GET IN TOUCH</span>

                    <h2>Have a Question?</h2>

                    <p>
                        Contact us for study material,
                        notes and educational information.
                    </p>

                </div>

                <a
                    href="mailto:info@univgreeks.com"
                    className="contact-button"
                >
                    Contact Us
                </a>

            </section>


            {/* FOOTER */}
            <footer className="footer">

                <div className="footer-inner">

                    <div>

                        <h3>
                            <span className="footer-brand"></span>
                            <img
                            src="/logo.jpg"
                            alt="univGreeks Logo"
                            className="footer-logo"
                            />
                            <span>univgeeks</span>

                            
                        </h3>

                        <p>
                            Learn better. Prepare better. Achieve better.
                        </p>

                    </div>


                    <div>

                        <h4>Quick Links</h4>

                        <button onClick={() => scrollTo("home")}>
                            Home
                        </button>

                        <button onClick={() => scrollTo("streams")}>
                            Stream
                        </button>

                        <button onClick={() => scrollTo("pyqs")}>
                            PYQs
                        </button>

                        <button onClick={() => scrollTo("notes")}>
                            Notes
                        </button>

                    </div>


                    <div>

                        <h4>Contact</h4>

                        <p>📧 info@univgreeks.com</p>
                        <p>🎓 Education Platform</p>

                    </div>

                </div>

                <div className="copyright">
                    © 2026 univGreeks. All rights reserved.
                </div>

            </footer>


            {/* LOGIN */}
            {loginOpen && (

                <div
                    className="modal-overlay"
                    onClick={() => setLoginOpen(false)}
                >

                    <div
                        className="login-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="close-button"
                            onClick={() => setLoginOpen(false)}
                        >
                            ×
                        </button>

                        <div className="login-logo">
                            U
                        </div>

                        <h2>Welcome Back</h2>

                        <p>Login to continue learning.</p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setLoginOpen(false);
                            }}
                        >

                            <input
                                type="email"
                                placeholder="Email"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                required
                            />

                            <button
                                type="submit"
                                className="primary-button full-button"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </main>
    );
}