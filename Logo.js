
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export const Logo = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "text-xl gap-2",
    md: "text-4xl gap-3",
    lg: "text-7xl md:text-8xl gap-4"
  };

  return html`
    <div className=${`flex items-center font-black tracking-tighter select-none group ${sizeClasses[size]} ${className}`}>
      <span className="relative inline-block transition-transform duration-500 group-hover:scale-105">
        <span className="relative text-green-glow transition-all duration-500">Stable</span>
      </span>
      <span className="text-gray-900 transition-transform duration-500 group-hover:scale-105 inline-block">SMP</span>
    </div>
  `;
};
