import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { BASE_URL, MODULE_URL, BLOG_URL } from "@/constants/paths";
import { NavBar } from "@/components/generalComponents/navbar";
import { ScrollProgressBar } from "@/components/generalComponents/scroll-progress-bar";
import { ThemeProvider } from "@/components/generalComponents/theme-provider";
import { HomePage } from "@/pages/home";
import { ModulePage } from "@/pages/modules";
import { BlogPage } from "@/pages/blogs";
import { BlogPostPage } from "@/pages/blog-post";

/**
 * Wraps each routed page so AnimatePresence can cross-fade between them.
 * The router scrolls to the top on navigation, so entering pages slide up
 * from a small offset rather than from below the fold.
 */
function PageShell({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageShell>
              <HomePage />
            </PageShell>
          }
        />
        <Route
          path={MODULE_URL}
          element={
            <PageShell>
              <ModulePage />
            </PageShell>
          }
        />
        <Route
          path={`${BLOG_URL}/:slug`}
          element={
            <PageShell>
              <BlogPostPage />
            </PageShell>
          }
        />
        <Route
          path={BLOG_URL}
          element={
            <PageShell>
              <BlogPage />
            </PageShell>
          }
        />
      </Routes>
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
