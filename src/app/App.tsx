import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { BASE_URL } from "@/constants";
import { HomePage } from "@/pages/home";
import { ModulePage } from "@/pages/modules";

function App() {
  return (
    <Router basename={BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modules" element={<ModulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
