import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Award } from "lucide-react";
import "./app.css";

export default function App() {
  const [theme, setTheme] = useState("night");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

const projects = [
  { title: "My Portfolio Website", img: "/projects/portfolio.jpg", desc: "Portfolio built using Vite.js and basic CSS.", link: "https://github.com/Gauravbhati2099/My-Portfolio-Website" },
  { title: "YouTube to Spotify Converter", img: "/projects/ytspotify.jpg", desc: "Python automation converting YouTube playlists to Spotify.", link: "https://github.com/Gauravbhati2099/YouTube-to-Soptify" },
  { title: "Automation Scripting", img: "/projects/automation.jpg", desc: "Python automation scripts handling routine workflows.", link: "https://github.com/Gauravbhati2099/Automation-Scripting" },
  { title: "Anomaly Detection Model", img: "/projects/anomaly2.jpg", desc: "Jupyter-based anomaly detection machine learning workflow.", link: "https://github.com/Gauravbhati2099/Anomaly-detection-model" },
  { title: "Walmart Sales Forecasting", img: "/projects/walmart.jpg", desc: "Time-series forecasting project for Walmart sales.", link: "https://github.com/Gauravbhati2099/walmart-sales-forecasting" },
  { title: "Customer Churn Data Exploration", img: "/projects/churn2.jpg", desc: "Jupyter Notebook analysis of churn datasets.", link: "https://github.com/Gauravbhati2099/Customer-churn-data" },
  { title: "Sentient Analysis Platform", img: "/projects/sentient.jpg", desc: "Python-based sentiment analysis implementation.", link: "https://github.com/Gauravbhati2099/Sentiant-Analysis-Platform" },
  { title: "Healthcare Resource Utilization (Notebook)", img: "/projects/healthcare2.jpg", desc: "Notebook version of healthcare analytics project.", link: "https://github.com/Gauravbhati2099/Healthcare-Resource-Utilization" },
  { title: "YouTube Trend Analysis", img: "/projects/ytrend.jpg", desc: "Data analysis of YouTube trending videos.", link: "https://github.com/Gauravbhati2099/Youtube-trend-Analysis" },
  { title: "E-commerce Website", img: "/projects/ecommerce.jpg", desc: "JavaScript-based e-commerce application UI.", link: "https://github.com/Gauravbhati2099/Ecommerce-website" },
  { title: "Modern ATM Simulator", img: "/projects/atm.jpg", desc: "Java-based ATM simulation system.", link: "https://github.com/Gauravbhati2099/Modern-ATM-Simulator" },
  { title: "Emotion Detection ChatBot", img: "/projects/emotionbot.jpg", desc: "Python chatbot detecting user emotions via ML.", link: "https://github.com/Gauravbhati2099/Emotion-detection-ChatBot" },
  { title: "Diabetes Prediction Platform", img: "/projects/diabetes2.jpg", desc: "IBM SkillBuild ML project predicting diabetes from structured data.", link: "https://github.com/Gauravbhati2099/Diabetes-Prediction-platfrom" }
];


  const certificates = [
    { title: "Google Data Analytics Specialization", link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/3T9XI52JL5QU" },
    { title: "Machine Learning Specialization (DeepLearning.AI)", link: "https://www.coursera.org/account/accomplishments/specialization/certificate/A3N616TXM8JY" },
    { title: "Python Developer Specialization (Microsoft)", link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/90NVYBG6ZEGJ" },
    { title: "MongoDB Developer's Toolkit: CRUD Mastery with Python", link: "https://www.geeksforgeeks.org/certificate/7a3113d2da8d3d1d2e82771ed7219a5e?utm_source=socials&utm_medium=cc_link" },
    { title: "45 Day training by Grass Solutions", link: "https://certificate.grras.com/verify/c7d09ee918577?s=true" },
    { title: "Career Essentials in Data Analysis by Microsoft and LinkedIn", link: "https://www.linkedin.com/learning/certificates/d1af1c440690f2d4e2903da59c32130677e12357642fb2e35896441f98aad830" },
    { title: "Data Analysis with Python", link: "https://freecodecamp.org/certification/Gauravbhati2099/data-analysis-with-python-v7" },
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
        <h2 className="section-heading">Projects</h2>
        <div className="cards-grid">
          {(showAllProjects ? projects : projects.slice(0, 6)).map((p, i) => (
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
        <div className="view-more-btn-wrapper">
          {!showAllProjects && projects.length > 6 && (
            <button className="btn view-more-btn" onClick={() => setShowAllProjects(true)}>
              View More
            </button>
          )}
          {showAllProjects && (
            <button className="btn view-more-btn" onClick={() => setShowAllProjects(false)}>
              View Less
            </button>
          )}
        </div>
      </section>

      {/* Certificates */}
      <section id="certificates" className="section">
          <h2 className="section-heading">Certificates</h2>
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
          <h2 className="section-heading">Skills</h2>
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
