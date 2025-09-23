import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-700 h-18 mb-0'>
            <div
            className="logo flex items-center space-x-1 cursor-pointer mt-4 ">
            <span className="text-2xl font-bold text-blue-600">{`{`}</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Admin Portal</span>
            <span className="text-2xl font-bold text-blue-600">{`}`}</span>
            </div>

            <div className="nav-links hidden md:flex items-center space-x-8 mt-4 cursor-pointer">
                <span className="text-gray-800 dark:text-white">Redirect to main site</span>
            </div>
            <div> <span className="text-gray-800 dark:text-white cursor-pointer font-bold">Logout</span></div>
            {/* Profile Button */}
            <div className="profile-button mt-4 cursor-pointer">
              <a href="/admin/profile" className="text-gray-800 dark:text-white">Profile</a>
            </div>

    </div>  
  )
}

export default Header