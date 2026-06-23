import React from 'react';

const Logo = ({ className = "h-8 w-auto", ...props }) => {
  return (
    <svg 
      viewBox="0 0 100 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask id="logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="150">
        {/* Silhouette profile containing the left stem, bottom base, and right hook */}
        <path 
          d="M 25 40
             A 15 15 0 0 1 40 25
             L 50 25
             A 12 12 0 0 1 62 37
             L 62 55
             L 70 55
             A 12 12 0 0 1 82 67
             L 82 95
             A 15 15 0 0 1 67 110
             L 40 110
             A 15 15 0 0 1 25 95
             Z" 
          fill="white" 
        />
        {/* Black diagonal capsule cutout */}
        <line 
          x1="43" 
          y1="91" 
          x2="83" 
          y2="45" 
          stroke="black" 
          strokeWidth="19" 
          strokeLinecap="round" 
        />
      </mask>
      {/* Rect filled with current text color, masked by the custom shape */}
      <rect width="100" height="150" fill="currentColor" mask="url(#logo-mask)" />
    </svg>
  );
};

export default Logo;
