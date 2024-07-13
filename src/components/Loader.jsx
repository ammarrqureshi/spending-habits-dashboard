// Loader.js
import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-100 bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
}

export default Loader;
