import React from 'react';

const Shimmer = () => {
  return (
    <div className="animate-pulse space-y-4">
      {Array(5).fill('').map((_, index) => (
        <div key={index}>
          {/* <div className="rounded-full bg-gray-300 h-12 w-12"></div> */}
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
