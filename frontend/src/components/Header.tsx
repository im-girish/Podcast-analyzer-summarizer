import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-6 px-8 shadow-xl rounded-b-3xl">
      <div className="flex items-center justify-between">
        {/* Left image */}
        <div className="flex-shrink-0">
          <img
            src="/bnmlogo2.jpeg"
            alt="BNMIT Logo"
            className="w-20 h-auto object-contain rounded-xl shadow-md"
          />
        </div>

        {/* Center text */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg">
            Podcast Analyzer & Summarizer
          </h1>
          <p className="text-md md:text-lg mt-2 font-medium opacity-90">
            Upload a YouTube link and get instant summaries!
          </p>
        </div>

        {/* Right empty space for balance */}
        <div className="w-20"></div>
      </div>
    </header>
  );
};

export default Header;
