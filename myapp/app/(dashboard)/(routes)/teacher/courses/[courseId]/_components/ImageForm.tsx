'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Course } from '@prisma/client';
import * as z from "zod"
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';

interface ImageFormProps {
    // onSubmit: (description: string) => void;
    initialData: Course
    courseId: string
}
const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: 'Image is required'
    })
})

const ImageForm: React.FC<ImageFormProps> = ({ initialData, courseId }) => {
    const [isediting, setisediting] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success('Course  updated')
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const toggleEdit = () => setisediting((current) => !current)

    const router = useRouter()



    return (
        <div className='mt-6 border p-4 rounded-md bg-slate-100'>
            <div className='font-medium flex justify-between items-center'>
                Course image
                <Button onClick={() => toggleEdit()} variant="ghost">
                {isediting && (
                    <>Cancel</>
                )}
                {!isediting && !initialData.imageUrl && (
                    <>
                    <PlusCircle className='h-2 w-2 mr-2' />
                    Add image
                    </>
                )}
                {!isediting && initialData.imageUrl && (
                    <>
                    <Pencil className='h-2 w-2 mr-2' />
                    Edit image
                    </>
                )}
            </Button>
            </div>
            {!isediting && (
                !initialData.imageUrl ? (
                    <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                        <ImageIcon className='h-10 w-10 text-slate-500 ' />
                    </div>
                ) : (
                    <div className='relative aspect-video mt-2'>
                        <Image 
                        alt='upload'
                        fill
                        className='object-cover rounded-md'
                        src={initialData.imageUrl}/>
                    </div>
                )
            )}
             {isediting && (
                    <div>
                        <FileUpload 
                        endpoint='courseImage'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({imageUrl: url})
                            }
                        }}/>
                        <div className='text-xs text-mutes-foreground mt-4'>
                            16:9 aspect ratio recommended
                        </div>
                    </div>
            )}
        </div>
    );
};

export default ImageForm;