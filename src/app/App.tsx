import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { BASE_URL } from "@/constants/paths";
import { HomePage } from "@/pages/home";
import { ModulePage } from "@/pages/modules";
import { BlogPage } from "@/pages/blogs";

function App() {
  return (
    <Router basename={BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modules" element={<ModulePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
