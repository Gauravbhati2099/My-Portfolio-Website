import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Award } from "lucide-react";
import "./index.css";

export default function App() {
  const [theme, setTheme] = useState("day");
  const [menuOpen, setMenuOpen] = useState(false);

  const projects = [
    { title: "Customer Churn Analytics Dashboard", img: "/projects/churn.jpg", desc: "SQL + Power BI pipeline analyzing telecom churn drivers.", link: "https://github.com/Gauravbhati2099" },
    { title: "YouTube Trending Insights Analyzer", img: "/projects/youtube.jpg", desc: "API + web scraping with BeautifulSoup & SQL analysis.", link: "https://github.com/Gauravbhati2099" },
    { title: "Retail Sales Forecasting", img: "/projects/retail.jpg", desc: "Time-series forecasting & dashboards for inventory planning.", link: "https://github.com/Gauravbhati2099" },
    { title: "Healthcare Resource Utilization", img: "/projects/healthcare.jpg", desc: "SQL + Power BI analysis of hospital occupancy and wait times.", link: "https://github.com/Gauravbhati2099" },
    { title: "Sentiment Analysis Platform", img: "/projects/sentiment.jpg", desc: "Full-stack web app analyzing YouTube comments with ML pipeline.", link: "https://github.com/Gauravbhati2099" },
    { title: "Diabetes Prediction Model", img: "/projects/diabetes.jpg", desc: "Logistic regression with real-time Streamlit predictions.", link: "https://github.com/Gauravbhati2099" },
    { title: "Anomaly Detection System", img: "/projects/anomaly.jpg", desc: "Power consumption anomaly detection using ML techniques.", link: "https://github.com/Gauravbhati2099" },
    { title: "Product Store (E-commerce)", img: "/projects/MainPage.jpg", desc: "MERN stack store with analytics & Google Authentication.", link: "https://github.com/Gauravbhati2099" },
  ];

  const certificates = [
    { title: "Google Data Analytics Specialization", link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/3T9XI52JL5QU" },
    { title: "Machine Learning Specialization (DeepLearning.AI)", link: "https://www.coursera.org/account/accomplishments/specialization/certificate/A3N616TXM8JY" },
    { title: "Python Developer Specialization (Microsoft)", link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/90NVYBG6ZEGJ" },
    { title: "MongoDB Developer's Toolkit: CRUD Mastery with Python", link: "https://www.geeksforgeeks.org/certificate/7a3113d2da8d3d1d2e82771ed7219a5e?utm_source=socials&utm_medium=cc_link" },
    { title: "Career Essentials in Data Analysis (Microsoft and LinkedIn)", link: "" },
  ];

  return (
    <div className={`page-wrapper ${theme}-mode`}>
      {/* Techy Background Shapes */}
      <div className="tech-shape hexagon" style={{ top: "10%", left: "5%" }}></div>
      <div className="tech-shape triangle" style={{ top: "60%", left: "80%", width: "120px", height: "120px", animationDuration: "45s" }}></div>
      <div className="tech-shape circle" style={{ top: "30%", left: "70%", width: "100px", height: "100px", animationDuration: "35s" }}></div>
      <div className="tech-shape hexagon" style={{ top: "75%", left: "20%", width: "130px", height: "130px", animationDuration: "50s" }}></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><a href="">Gaurav Singh Bhati</a></div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <a href="" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#certificates" onClick={() => setMenuOpen(false)}>Certificates</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="theme-toggle" onClick={() => { setTheme(theme === "day" ? "night" : "day"); setMenuOpen(false); }}>
            {theme === "day" ? "🌙 Night" : "☀️ Day"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Data Analytics Enthusiast
        </motion.h1>
        <p>Turning raw data into actionable insights with SQL, Python, Power BI, and Google Sheets.</p>
      </header>

      {/* About */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I am an <strong>innovative and results-driven Computer Science undergraduate</strong> with strong foundations in 
          <strong> Python, C++, SQL, and Machine Learning</strong>. Passionate about transforming <em>raw data into meaningful insights</em>, 
          I thrive on building solutions that connect <strong>technology with real-world challenges</strong>.
        </p>
        <p>
          My experience spans across <strong>end-to-end analytics pipelines</strong>, <strong>predictive modeling</strong>, and 
          <strong>full-stack development</strong>. I have developed projects such as a <strong>Sentiment Analysis Platform</strong>, 
          <strong> Diabetes Prediction System</strong>, and <strong>Anomaly Detection Models</strong>, gaining exposure to both 
          <strong>industry-standard tools</strong> and <strong>research-driven practices</strong>.
        </p>
        <p>
          Beyond technical work, I actively engage in <strong>Kaggle competitions</strong>, contribute to 
          <strong>open-source projects (GSoC aspirant)</strong>, and value <strong>teamwork, adaptability, and communication</strong>. 
          My long-term goal is to contribute to <strong>AI innovation, scalable software systems, and impactful research</strong>.
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="cards-grid">
          {projects.map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, y: -8 }} className="card">
              <div className="card-image"><img src={p.img} alt={p.title} /></div>
              <div className="card-title"><h5>{p.title}</h5></div>
              <div className="card-overlay">
                <p>{p.desc}</p>
                <a href={p.link} className="btn">View Project →</a>
              </div>
            </motion.div>
          ))}
        </div>
      
      </section>

      {/* Certificates */}
      <section id="certificates" className="section">
        <h2>Certificates</h2>
        <div className="cards-grid">
          {certificates.map((c, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, y: -8 }} className="cert-card">
              <Award className="icon" />
              <a href={c.link}>{c.title}</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <h2>Skills</h2>
        <ul>
          <li><strong>Languages:</strong> Python, C++, SQL, NoSQL (MongoDB, PostgreSQL)</li>
          <li><strong>Frameworks & Tools:</strong> TensorFlow, PyTorch, Flask, Django, React, Node.js, Streamlit</li>
          <li><strong>Expertise:</strong> Machine Learning, NLP, Computer Vision, Data Analytics, Web Development</li>
          <li><strong>Other:</strong> GitHub, Google APIs, Automation (Selenium, BeautifulSoup), Power BI</li>
        </ul>
      </section>

      

      {/* Footer */}
      <section id="send-mail contact" className="section transparent-section">
  <h2>Send Me a Mail</h2>
  <p>Fill out the form below and I'll get back to you!</p>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.target;
      const userEmail = form.userEmail.value;
      const subject = form.subject.value;
      const message = form.message.value;
      const mailtoLink = `mailto:Gauravbhati2099@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(`From: ${userEmail}\n\n${message}`)}`;
      window.location.href = mailtoLink;
    }}
    className="send-mail-form"
  >
    <input
      type="email"
      name="userEmail"
      placeholder="Your Email"
      required
      className="send-mail-input"
    />
    <input
      type="text"
      name="subject"
      placeholder="Subject"
      required
      className="send-mail-input"
    />
    <textarea
      name="message"
      rows="4"
      placeholder="Your message..."
      required
      className="send-mail-textarea"
    />
    <button type="submit" className="btn send-mail-btn">
      Send Mail
    </button>
  </form>
</section>
      {/* Wave Separator (Inverted) */}
        <svg
          className="wave inverted-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(0,0,0,0.1)"
            d="M0,32L48,48C96,64,192,96,288,85.3C384,75,480,21,576,26.7C672,32,768,96,864,106.7C960,117,1056,75,1152,64C1248,53,1344,75,1392,85.3L1440,96L1440,0L0,0Z"
          ></path>
        </svg>

      <footer>
        <h2>Contact</h2>
        <div className="contact-links">
          <a href="https://www.linkedin.com/in/gauravbhati2099"><Linkedin /></a>
          <a href="https://github.com/gauravbhati2099"><Github /></a>
        </div>
        <p>© 2025 Gaurav Bhati • Made with 💻 + 🎵</p>
      </footer>
    </div>
  );
}
