import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { HomePage } from "@/pages/home";
import { ModulePage } from "@/pages/modules";

function App() {
  return (
    <Router basename="/personal-website/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modules" element={<ModulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
