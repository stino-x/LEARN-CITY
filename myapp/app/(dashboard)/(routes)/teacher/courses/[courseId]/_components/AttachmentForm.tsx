'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Course, Attachment } from '@prisma/client';
import * as z from "zod"
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';

interface AttachmentFormProps {
    // onSubmit: (description: string) => void;
    initialData: Course & { attachments: Attachment[] };
    courseId: string
}
const formSchema = z.object({
    url: z.string().min(1)
})

const AttachmentForm: React.FC<AttachmentFormProps> = ({ initialData, courseId }) => {
    const [isediting, setisediting] = useState(false);
    const [deletingId, setdeletingId] = useState<string | null>(null);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success('Course  updated')
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const onDelete = async(id: string) => {
        try {
            setdeletingId(id)
            await axios.post(`/api/courses/${courseId}/attachments/${id}`)
            toast.success("attachment deleted")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setdeletingId(null)
        }
    }

    const toggleEdit = () => setisediting((current) => !current)

    const router = useRouter()



    return (
        <div className='mt-6 border p-4 rounded-md bg-slate-100'>
            <div className='font-medium flex justify-between items-center'>
                Course Attachments
                <Button onClick={() => toggleEdit()} variant="ghost">
                {isediting && (
                    <>Cancel</>
                )}
                {!isediting && (
                    <>
                    <PlusCircle className='h-2 w-2 mr-2' />
                    Add a file
                    </>
                )}
            </Button>
            </div>
            {!isediting && (
              <>
                {initialData.attachments.length === 0 && (
                  <p className='text-sm mt-2 text-slate-500 italic'>
                    No attachments yet
                  </p>
                )}
                {initialData.attachments.length > 0 && (
                    <div className='space-y-2'>
                        {initialData.attachments.map((attachment: Attachment) => (
                          <div className='flex items-center p-3 w-full bg-sky-100 border border-sky-200 text-sky-700 rounded-md' key={attachment.id}>
                            {/* <Image
                              src='/file-icon.png'
                              width={20}
                              height={20}
                              alt='file icon'
                            /> */}
                            <File className='h-4 w-4 flex-shrink-0' />
                            <p className='text-sm line-clamp-1'>
                            {attachment.name}
                            </p>
                            {deletingId === attachment.id && (
                                <div>
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                </div>
                            )}
                            {deletingId !== attachment.id && (
                                <button onClick={() => onDelete(attachment.id)} className='ml-auto hover:opacity-75 transition'>
                                    <X className='h-4 w-4' />
                                </button>
                            )}
                            {/* <a
                              className='ml-2 text-sm text-slate-500'
                              href={attachment.url}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {attachment.url}
                            </a> */}
                          </div>
                        ))}
                    </div>
                )}
              </>
            )}
             {isediting && (
                    <div>
                        <FileUpload 
                        endpoint='courseAttachment'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({url: url})
                            }
                        }}/>
                        <div className='text-xs text-mutes-foreground mt-4'>
                            add anything your studentd might need to complete the course
                        </div>
                    </div>
            )}
        </div>
    );
};

export default AttachmentForm;