'use client'
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
// import { UploadDropzone } from '@uploadthing/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {onChange, endpoint} = props

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     setSelectedFile(file);
    // };

    // const handleUpload = () => {
    //     if (selectedFile) {
    //         // TODO: Implement file upload logic here
    //         console.log('Uploading file:', selectedFile.name);
    //     }
    // };

    return (
        <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
            toast.error(`${error?.message}`)
        }}/>
    );
};

export default FileUpload;
