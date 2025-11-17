// components/base/SkeletonLoader.jsx
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="p-3 max-w-6xl mx-auto space-y-3">
      {/* Heading placeholder */}
      <div className="relative overflow-hidden bg-gray-300 rounded h-10 w-3/4 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      </div>

      {/* Subheading */}
      <div className="relative overflow-hidden bg-gray-300 rounded h-7 w-1/2 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      </div>

      {/* Paragraph lines */}
      <div className="space-y-2">
        <div className="relative overflow-hidden bg-gray-300 rounded h-4 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
        </div>
        <div className="relative overflow-hidden bg-gray-300 rounded h-4 w-5/6">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
        </div>
        <div className="relative overflow-hidden bg-gray-300 rounded h-4 w-2/3">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
        </div>
      </div>

      {/* Button placeholder */}
      <div className="relative overflow-hidden bg-gray-300 rounded h-9 w-36 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      </div>

      {/* Multiple content blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="relative overflow-hidden bg-gray-300 rounded h-6 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
            </div>
            <div className="relative overflow-hidden bg-gray-300 rounded h-4 w-5/6">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
            </div>
            <div className="relative overflow-hidden bg-gray-300 rounded h-4 w-2/3">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
            </div>
            <div className="relative overflow-hidden bg-gray-300 rounded h-7 w-28">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
