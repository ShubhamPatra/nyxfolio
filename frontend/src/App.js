import React from "react";
import "./styles/App.css";
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
