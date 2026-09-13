import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-50 text-zinc-800 flex flex-col font-sans">
        <Navbar />
        <main className="flex-row">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
