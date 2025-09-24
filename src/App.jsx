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
import MainPage from './pages/AdminPages/MainPage.jsx';
import AdminSkills from './pages/AdminPages/AdminSkills.jsx';
import ProjectsAdmin from './pages/AdminPages/AdminProjects.jsx';
import ContactAdmin from './pages/AdminPages/AdminContact.jsx';
import AdminExperience from './pages/AdminPages/AdminExperience.jsx';
import AdminWebContent from './pages/AdminPages/AdminWebContent.jsx';
import AdminProfile from './pages/AdminPages/AdminProfile.jsx';
import AdminLogin from './pages/AdminPages/AdminLogin.jsx';

//protected route
import ProtectedRoute from "./components/AdminDashboard/ProtectedRoute.jsx"; 



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

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <AdminSkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ProjectsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <ContactAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/experience"
          element={
            <ProtectedRoute>
              <AdminExperience />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/web-content"
          element={
            <ProtectedRoute>
              <AdminWebContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
