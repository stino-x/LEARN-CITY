'use client';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import React from 'react';
import ReactConfetti from 'react-confetti'; // Import the ReactConfetti component

// Create a context for the ConfettiProvider
interface ConfettiProviderProps {
    children: React.ReactNode;
}

// ConfettiProvider component
const ConfettiProvider: React.FC<ConfettiProviderProps> = ({ children }) => {
    const confetti = useConfettiStore();

    return (
        <>
            {confetti.isOpen && (
                <ReactConfetti 
                    className="pointer-events-none z-[100]"
                    numberOfPieces={500}
                    recycle={false}
                    onConfettiComplete={() => {
                        confetti.onClose();
                    }}
                />
            )}
            {children}
        </>
    );
};

export default ConfettiProvider;
