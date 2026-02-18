import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import profilePic from "@/assets/Owen_Picture.jpg";

export function IntroSection() {
  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row items-center justify-between gap-10"
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
            className="text-slate-600 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300"
          >
            <FaGithub size={28} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/owentankengleng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300"
          >
            <FaLinkedin size={28} />
          </a>

          {/* Email */}
          <a
            href="mailto:owentan2021@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300"
          >
            <IoIosMail size={28} />
          </a>

          {/* Resume Download */}
          {/* The href "resume.pdf" looks for the file in the public folder */}
          <a
            href="OwenTanKengLeng_Resume.pdf"
            download="Owen_Resume.pdf"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <FaFilePdf size={18} />
            Resume
          </a>
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
