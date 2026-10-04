import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

import { BASE_URL, MODULE_URL, BLOG_URL } from "@/constants/paths";
import { EASE_OUT_EXPO } from "@/components/motion/variants";
import { NavBar } from "@/components/generalComponents/navbar";
import { ScrollProgressBar } from "@/components/generalComponents/scroll-progress-bar";
import { ThemeProvider } from "@/components/generalComponents/theme-provider";
import { HomePage } from "@/pages/home";
import { ModulePage } from "@/pages/modules";
import { BlogPage } from "@/pages/blogs";
import { BlogPostPage } from "@/pages/blog-post";

/**
 * Cross-fades between routes. The router scrolls to the top on navigation, so
 * entering pages slide up from a small offset rather than from below the fold.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path={MODULE_URL} element={<ModulePage />} />
          <Route path={`${BLOG_URL}/:slug`} element={<BlogPostPage />} />
          <Route path={BLOG_URL} element={<BlogPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router basename={BASE_URL}>
        <ScrollProgressBar />
        <NavBar />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
