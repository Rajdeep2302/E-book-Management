import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard = ({ children, className = '', hover = true, onClick }: GlassCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl 
        bg-white/[0.03] border border-white/[0.05] 
        backdrop-blur-xl backdrop-saturate-150
        transition-all duration-300
        ${hover ? 'hover:bg-white/[0.06] hover:border-white/[0.1] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50' : ''}
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
    >
      {/* Glossy reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {children}
    </div>
  );
};

export default GlassCard;
