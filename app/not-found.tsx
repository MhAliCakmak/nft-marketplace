//@ts-nocheck

import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const NotFound: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-white p-6 text-center">
      <img
      src="/icons/icon-512x512.png" // Replace with your logo URL
      alt="Logo"
      className="w-24 h-24 mb-6"
    />
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-lg text-[#CBCFCE] my-4">
        Please try refreshing the page, or go back to the homepage.
      </p>
      <div>
        <button
          onClick={reset}
          className="m-3 bg-[#07E943] text-[#082622] font-medium text-sm p-3 rounded-lg hover:opacity-80 "
        >
          Try Again
        </button>
        <a
          href="/"
           className="m-3 bg-[#A9CEB3] text-[#082622] font-medium text-sm p-3 rounded-lg hover:opacity-80 "
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;