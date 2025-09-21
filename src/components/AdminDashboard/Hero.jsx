import React from 'react';
import SectionCard from './SectionCard.jsx';

const HeroSection = () => {
  const sections = [
    {
      title: 'Projects',
      description: 'Explore our innovative projects showcasing creativity and technical expertise.',
      link: '/admin/projects',
      image: 'https://images.unsplash.com/photo-1516321310765-79f9f9e5b3d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
    },
    {
      title: 'Skills',
      description: 'Discover the diverse skill set that drives our success.',
      link: '/admin/skills',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
    },
    {
      title: 'Experience',
      description: 'Learn about our extensive experience in delivering quality solutions.',
      link: '/admin/experience',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
    },
    {
      title: 'Contact',
      description: 'Get in touch with us for inquiries or collaborations.',
      link: '/admin/contact',
      image: 'https://images.unsplash.com/photo-1516321165247-7d868bd23a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
    },
    {
      title: 'Web Content',
      description: 'Dive into our engaging and dynamic web content.',
      link: '/admin/web-content',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
    },
    {
      title: 'Hiring Messages',
      description: 'Join our team! Check out our hiring opportunities.',
      link: '/admin/hiring',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
    },
  ];

  return (
    <section className="bg-white text-white  md:py-2 lg:py-2 dark:bg-gray-900 mb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600 dark:text-white">Portfolio Management System</h1>
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {sections.map((section, index) => (
            <SectionCard
              key={index}
              title={section.title}
              description={section.description}
              link={section.link}
              image={section.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;