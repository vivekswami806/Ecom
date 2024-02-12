import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-sm">© 2024 Your Website</p>
          <div>
            <a href="#" className="text-gray-300 hover:text-white px-2">Home</a>
            <a href="#" className="text-gray-300 hover:text-white px-2">About</a>
            <a href="#" className="text-gray-300 hover:text-white px-2">Category</a>
            <a href="#" className="text-gray-300 hover:text-white px-2">Login</a>
            <a href="#" className="text-gray-300 hover:text-white px-2">Register</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
