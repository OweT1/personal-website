import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { BASE_URL, MODULE_URL, BLOG_URL } from "@/constants/paths";
import { HomePage } from "@/pages/home";
import { ModulePage } from "@/pages/modules";
import { BlogPage } from "@/pages/blogs";
import { BlogPostPage } from "@/pages/blog-post";

function App() {
  return (
    <Router basename={BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={MODULE_URL} element={<ModulePage />} />
        <Route path={`${BLOG_URL}/:slug`} element={<BlogPostPage />} />
        <Route path={BLOG_URL} element={<BlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
