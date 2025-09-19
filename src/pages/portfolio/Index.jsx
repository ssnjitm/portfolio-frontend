import React from 'react'
import Header from '../../components/portfolio/Header'
import Hero from '../../components/portfolio/Hero'

const index = () => {
  return (
    <div className='bg-gradient-to-b from-black via-black to-gray-800 text-white min-h-screen'>

                <Hero />
                <About />
                <Skills />
                <Projects />
                <ExperienceSection />
                <Contact />
                <BackToTop /> 
   
    </div>
  )
}

export default index
