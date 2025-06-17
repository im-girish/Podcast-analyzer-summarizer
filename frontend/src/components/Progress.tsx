import React from 'react';

const Progress: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-12">
      <div className="text-center">
        <div className="loader ease-linear border-8 border-t-8 border-blue-500 h-24 w-24 rounded-full animate-spin mx-auto mb-6 shadow-lg"></div>
        <p className="text-lg font-semibold text-gray-700">Analyzing your podcast... Please wait!</p>
      </div>
    </div>
  );
};

export default Progress;
