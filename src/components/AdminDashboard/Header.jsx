import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleRedirectToMainSite = () => {
    navigate('/');
  };

  return (

    <div

      className='flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-700 h-18 mb-0'>
      <div
        className="logo flex items-center space-x-1 cursor-pointer mt-4 ">
        <span className="text-2xl font-bold text-blue-600">{`{`}</span>
        <span className="text-xl font-bold text-gray-800 dark:text-white">Admin Portal</span>
        <span className="text-2xl font-bold text-blue-600">{`}`}</span>
      </div>

      <div
        onClick={handleRedirectToMainSite}
        className="nav-links hidden md:flex items-center space-x-8 mt-4 cursor-pointer">
        <span
          className="text-gray-800 dark:text-white hover:text-blue-600 transition-colors">Redirect to main site</span>
      </div>
      <div onClick={handleLogout}>
        <span className="text-gray-800 dark:text-white cursor-pointer font-bold hover:text-red-600 transition-colors">Logout</span>
      </div>
      {/* Profile Button */}
      <div className="profile-button mt-4 cursor-pointer">
        <a href="/admin/profile" className="text-gray-800 dark:text-white hover:text-blue-600 transition-colors">Profile</a>
      </div>

    </div>
  )
}

export default Header