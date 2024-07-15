'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';

interface ToasterProviderProps {
  children: React.ReactNode;
}

// ToasterProvider component
const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default ToasterProvider;
