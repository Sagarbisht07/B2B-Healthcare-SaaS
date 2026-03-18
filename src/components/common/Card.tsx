import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  padding = 'md', 
  ...props 
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
