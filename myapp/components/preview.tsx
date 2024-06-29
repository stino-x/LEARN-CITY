'use client'
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

interface PreviewProps {
    // onChange: (value: string) => void;
    value: string;
}

const Preview: React.FC<PreviewProps> = ({
    value,
}) => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])
    // Implement your component logic here

    return (
        
            <ReactQuill theme="bubble"  value={value} readOnly />
        
    );
};

export default Preview;

