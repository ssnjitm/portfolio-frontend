import { useEffect } from "react";
import TypingEffect from "./TypingEffect";
import useWebContentStore from "../../store/useWebContentStore";

const About = () => {
  const {
    webContent,
    fetchWebContent,
    error,
    loading,
    success,
  } = useWebContentStore();

useEffect(() => {
    fetchWebContent();
  }, [fetchWebContent]);


  if (loading) return <p>Loading content...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!webContent) return <p>No content available</p>;
  return (
    <section id="about" className="section py-20 bg-white dark:bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header mb-12 text-center">
          <h2 className="section-title inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
            <span className="section-number text-blue-600 mr-3 text-xl"></span> About Me
          </h2>
          <div className="section-line w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>
<div className="about-content">
  <div className="about-grid grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
    {/* Profile Image */}
    <div className="profile-image-container flex justify-center md:justify-end pr-6">
      <div className="profile-image w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-600/20">
        <img
          src={webContent.aboutMeImage}
          alt="Sanjeet Mijar"
          className="profile-img w-full h-full object-cover"
        />
      </div>
    </div>

    {/* About Content */}
    <div className="about-text pl-6">
      <p className="about-intro text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
        Hello! I'm{" "}
        <span className="highlight-name text-blue-600 font-semibold">
          Sanjeet Mijar
        </span>
        , a passionate full-stack developer focused on building efficient,
        scalable, and user-friendly applications.
      </p>
      <p className="text-lg  about-description text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
      {webContent.aboutMeDescription2}
      </p>
      <p className="text-lg  about-description text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        When I'm not coding, I explore new technologies, contribute to
        open-source, or share knowledge with tech communities.
      </p>


    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default About;