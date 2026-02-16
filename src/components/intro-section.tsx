import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";
import profilePic from "@/assets/Owen_Picture.jpg";

export function IntroSection() {
  return (
    <section id="intro" className="section">
      <div className="intro-container">
        <div className="intro-text">
          <h1>Hi, I'm Owen!</h1>
          <p>
            Year 4 Data Science and Analytics student from NUS, Primarily
            interested in Data Science and Machine Learning
          </p>

          {/* 2. Add this div for the social links */}
          <div className="social-links">
            {/* GitHub */}
            <a
              href="https://github.com/OweT1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/owentankengleng"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} />
            </a>

            {/* Resume Download */}
            {/* The href "resume.pdf" looks for the file in the public folder */}
            <a
              href="OwenTanKengLeng_Resume.pdf"
              download="Owen_Resume.pdf"
              className="resume-btn"
            >
              <FaFilePdf
                size={20}
                style={{ marginRight: "8px", color: "white" }}
              />
              Download Resume
            </a>
          </div>
        </div>
        <div className="intro-image">
          <img src={profilePic} alt="Profile Picture" />
        </div>
      </div>
    </section>
  );
}
