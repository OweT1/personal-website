import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import profilePic from "@/assets/Owen_Picture.jpg";
import { MODULE_URL } from "@/constants/paths";
import { buttonVariants } from "@/constants/themes";
import {
  EASE_OUT_EXPO,
  fadeUp,
  staggerContainer,
} from "@/components/motion/variants";

// Hoisted so the variant tree is built once, not on every render.
const textStagger = staggerContainer(0.09, 0.05);
const textItem = fadeUp(20);

export function IntroSection() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Portrait drifts and scales slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="flex flex-col md:flex-row items-center justify-between gap-12"
    >
      <motion.div
        className="flex-1 text-center md:text-left space-y-6"
        style={reduceMotion ? undefined : { y: textY }}
        variants={textStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={textItem}
          className="text-sm font-semibold uppercase tracking-widest text-brand"
        >
          B.Sc. (Hons) Data Science &amp; Analytics · NUS
        </motion.p>

        <motion.h1
          variants={textItem}
          className="text-4xl md:text-5xl font-bold tracking-tight text-ink"
        >
          Owen Tan Keng Leng
        </motion.h1>

        <motion.p
          variants={textItem}
          className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-lg mx-auto md:mx-0"
        >
          Data and Machine Learning Engineer with hands-on industry experience at
          GIC, Temasek, and DBS. I build scalable, data-driven systems from LLM
          pipelines to optimisation tools.
        </motion.p>

        <motion.div
          variants={textItem}
          className="flex items-center justify-center md:justify-start gap-4 pt-2"
        >
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
        </motion.div>
      </motion.div>

      <motion.div
        className="relative shrink-0"
        style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.85, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        {/* Soft accent glow behind the portrait. */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-full bg-brand/10 blur-2xl"
        />
        <img
          src={profilePic}
          alt="Owen Tan Keng Leng"
          width={256}
          height={256}
          className="relative w-56 h-56 md:w-64 md:h-64 object-cover rounded-full
                     border-4 border-surface shadow-xl"
        />
      </motion.div>
    </section>
  );
}
