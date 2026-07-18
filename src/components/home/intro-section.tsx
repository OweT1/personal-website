import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import profilePic from "@/assets/Owen_Picture.jpg";
import { buttonVariants } from "@/constants/themes";

export function IntroSection() {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      // className="flex flex-col-reverse md:flex-row items-center justify-between gap-10" // vertical alignment
      className="flex flex-row md:flex-col-reverse items-center justify-between gap-15"
    >
      <div className="flex-1 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Owen!
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
          Year 4 Data Science and Analytics student from NUS. Passionate about
          building{" "}
          <span className="text-orange-600 font-semibold">
            scalable and data-driven solutions!
          </span>
        </p>

        {/* 2. Add this div for the social links */}
        <div className="flex items-center justify-center md:justify-start gap-5 pt-2">
          {/* GitHub */}
          <a
            href="https://github.com/OweT1"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants.miniHoverOrange}
          >
            <FaGithub size={28} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/owentankengleng"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants.miniHoverBlue}
          >
            <FaLinkedin size={28} />
          </a>

          {/* Email */}
          <a
            href="mailto:owentan2021@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants.miniHoverOrange}
          >
            <IoIosMail size={28} />
          </a>

          {/* Resume Download */}
          <a
            href="OwenTanKengLeng_Resume.pdf" // looks in public folder
            download="Owen_Resume.pdf"
            className={`flex items-center gap-2 ${buttonVariants.gradualRedOrange}`}
          >
            <FaFilePdf size={18} />
            Resume
          </a>
        </div>
        {/* Personal Website Sections*/}
        <div className="flex items-center justify-center md:justify-start gap-5 pt-2">
          <button
            onClick={() => navigate("/modules")}
            className={buttonVariants.gradualRedBlue}
          >
            🦁 Module Reviews
          </button>

          <button
            onClick={() => navigate("/blog")}
            className={buttonVariants.gradualRedBlue}
          >
            ✍️ Personal Blog
          </button>
        </div>
      </div>
      {/* Image Side (Floating) */}
      <div className="relative group">
        {/* Decorative Blur behind image */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

        <img
          src={profilePic}
          alt="Profile"
          className="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-2xl animate-float"
        />
      </div>
    </section>
  );
}
