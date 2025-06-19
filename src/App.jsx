

import About from './components/About';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import ExperienceSection from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
       <Skills />
       <Projects />
      <ExperienceSection />
        <Contact />
        <BackToTop />
      </main>
      <Footer/>
    </>
  );
};

export default App;
