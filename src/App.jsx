import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/portfolio/About.jsx';
import BackToTop from './components/portfolio/BackToTop.jsx';
import Contact from './components/portfolio/Contact.jsx';
import ExperienceSection from './components/portfolio/Experience.jsx';
import Footer from './components/portfolio/Footer.jsx';
import Header from './components/portfolio/Header.jsx';
import Hero from './components/portfolio/Hero.jsx';
import Projects from './components/portfolio/Projects.jsx';
import Skills from './components/portfolio/Skills.jsx';
import Layout from './components/AdminDashboard/Layout.jsx';
import Login from './pages/AdminPages/Login.jsx';
import ProjectsAdmin from './pages/AdminPages/Projects.jsx';
import SkillsAdmin from './pages/AdminPages/Skills.jsx';
import ExperienceAdmin from './pages/AdminPages/Experience.jsx';
import ProtectedRoute from './components/AdminDashboard/ProtectedRoute.jsx';
import ContactAdmin from './pages/AdminPages/Contact.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
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
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<ProtectedRoute><Layout>Admin Home</Layout></ProtectedRoute>} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/projects" element={<ProtectedRoute><Layout><ProjectsAdmin /></Layout></ProtectedRoute>} />
        <Route path="/admin/skills" element={<ProtectedRoute><Layout><SkillsAdmin /></Layout></ProtectedRoute>} />
        <Route path="/admin/experience" element={<ProtectedRoute><Layout><ExperienceAdmin /></Layout></ProtectedRoute>} />
        <Route path="/admin/contacts" element={<ProtectedRoute><Layout><ContactAdmin /></Layout></ProtectedRoute>} />
        <Route path="*" element={<div style={{padding: 24}}>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
