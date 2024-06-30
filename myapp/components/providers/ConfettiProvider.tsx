import { useConfettiStore } from '@/hooks/use-confetti-store';
import React, { createContext, useState } from 'react';
import ReactConfetti from 'react-confetti'; // Import the ReactConfetti component

// Create a context for the ConfettiProvider
// export const ConfettiContext = createContext<boolean>(false);
interface ConfettiProviderProps {
    children: React.ReactNode;
  }
  
  //ConfettiProvider component
const ConfettiProvider: React.FC<ConfettiProviderProps> = ({ children }) => {
    const confetti = useConfettiStore()

    if (!confetti.isOpen) return null

    return (
        <>
        <ReactConfetti 
        className="pointer-events-none z-[100]"
        numberOfPieces={500}
        recycle={false}
        onConfettiComplete={() => {
            confetti.onClose()
        }}/>
        {children}
        </>
    );
};

export default ConfettiProvider;