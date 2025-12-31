
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-lg shadow-sm">
        <span className="text-2xl font-black text-slate-900">7</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-slate-900 rounded-full border-2 border-white"></div>
      </div>
      <span className="text-2xl font-bold tracking-tight text-slate-900">
        Finan<span className="text-yellow-500">7</span>
      </span>
    </div>
  );
};

export default Logo;
