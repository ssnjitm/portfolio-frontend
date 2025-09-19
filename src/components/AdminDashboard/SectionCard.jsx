import React from 'react';
import { Link } from 'react-router-dom';

const SectionCard = ({ title, description, link, image }) => {
  return (
    <Link to={link} className="block max-w-sm mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <span className="inline-block mt-4 text-blue-500 font-medium hover:underline">Explore More</span>
      </div>
    </Link>
  );
};

export default SectionCard;