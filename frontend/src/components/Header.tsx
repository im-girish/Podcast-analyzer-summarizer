import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-orange-600 text-white py-4 px-4">
      <div className="flex items-center">
        {/* Left image section */}
        <div className="flex-shrink-0">
          <img
            src="/bnmlogo2.jpeg"
            alt="BNMIT Logo"
            className="w-23 h-auto object-contain"
          />
        </div>

        {/* Centered text in full remaining space */}
        <div className="flex-1 text-center ml-4">
          <h1 className="text-4xl font-bold mb-1">
            Podcast Analyzer & Summarizer By Team GCG
          </h1>
          <p className="text-lg font-bold">
            Upload Youtube link get instant summaries!
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
