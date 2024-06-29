'use client'
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
}

const Editor: React.FC<EditorProps> = ({
    onChange,
    value,
}) => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])
    // Implement your component logic here

    return (
        <div className='bg-white'>
            <ReactQuill theme="snow"  value={value} onChange={onChange} />
        </div>
    );
};

export default Editor;

