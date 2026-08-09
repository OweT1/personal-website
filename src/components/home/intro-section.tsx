import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import profilePic from "@/assets/Owen_Picture.jpg";
import { MODULE_URL } from "@/constants/paths";
import { buttonVariants } from "@/constants/themes";

export function IntroSection() {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-between gap-12"
    >
      <div className="flex-1 text-center md:text-left space-y-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
          B.Sc. (Hons) Data Science & Analytics · NUS
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Owen Tan Keng Leng
        </h1>
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto md:mx-0">
          Data scientist and quantitative strategist with hands-on industry
          experience at GIC, Temasek, and DBS. I build scalable, data-driven
          systems — from LLM pipelines to optimisation tools.
        </p>

        <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
          <a
            href="https://github.com/OweT1"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants.icon}
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="https://linkedin.com/in/owentankengleng"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants.icon}
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>

          <a
            href="mailto:owentan2021@gmail.com"
            className={buttonVariants.icon}
            aria-label="Email"
          >
            <IoIosMail size={24} />
          </a>

          <a
            href="OwenTanKengLeng_Resume.pdf"
            download="Owen_Resume.pdf"
            className={`${buttonVariants.primary} ml-2`}
          >
            <FaFilePdf size={16} />
            Resume
          </a>

          <button
            onClick={() => navigate(MODULE_URL)}
            className={buttonVariants.secondary}
          >
            Module Reviews
          </button>
        </div>
      </div>

      <div className="relative shrink-0">
        <img
          src={profilePic}
          alt="Owen Tan Keng Leng"
          className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-full border-4 border-white shadow-xl"
        />
      </div>
    </section>
  );
}