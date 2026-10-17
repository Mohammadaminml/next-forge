import React from 'react';

interface ButtonProps {
  // Add props here
}

export const Button: React.FC<ButtonProps> = ({}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">Button Component</h2>
    </div>
  );
};
