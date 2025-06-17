import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 text-gray-600 mt-16">
      <p className="text-sm">&copy; {new Date().getFullYear()} <span className="text-blue-500 font-semibold">Podcast Analyzer</span>. All rights reserved by <span className="text-pink-500">Team GCG</span>.</p>
    </footer>
  );
};

export default Footer;
