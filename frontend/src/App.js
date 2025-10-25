import { useState, useEffect } from "react";
import "./styles/App.css";
import SEO from "./components/SEO"; // import the SEO component
import Hero from "./components/Hero";
import ChatModal from "./components/ChatModal";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import NotFound from "./components/NotFound";

function App() {
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Check if we're on a 404 page (GitHub Pages redirects to index.html with query param)
    const params = new URLSearchParams(window.location.search);
    if (params.get('404') === 'true' || window.location.pathname !== '/') {
      setIs404(true);
    }
  }, []);

  // If 404, show the NotFound component
  if (is404) {
    return (
      <div className="app">
        <NotFound />
      </div>
    );
  }

  // Otherwise show the main portfolio
  return (
    <div className="app">
      <SEO />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      {/* ChatModal is now integrated into Contact section */}
      <ChatModal />
      <Footer />
    </div>
  );
}

export default App;
