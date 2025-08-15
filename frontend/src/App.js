import React from "react";
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

function App() {
  return (
    <div className="app">
      <React.Fragment>
        <SEO />
      </React.Fragment>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <ChatModal />
      <Footer />
    </div>
  );
}

export default App;
