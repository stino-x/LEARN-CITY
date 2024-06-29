'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import MuxPlayer from "@mux/mux-player-react";
import axios from 'axios';
import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Chapter, Course, MuxData } from '@prisma/client';
import * as z from "zod"
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';

interface ChapterVideoFormProps {
    // onSubmit: (description: string) => void;
    initialData: Chapter & { muxData?: MuxData | null}
    courseId: string
    chapterId: string
}
const formSchema = z.object({
    videoUrl: z.string().min(1)
})

const ChapterVideoForm: React.FC<ChapterVideoFormProps> = ({ chapterId, initialData, courseId }) => {
    const [isediting, setisediting] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success('Chapter  updated')
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
                Chapter Video
                <Button onClick={() => toggleEdit()} variant="ghost">
                {isediting && (
                    <>Cancel</>
                )}
                {!isediting && !initialData.videoUrl && (
                    <>
                    <PlusCircle className='h-2 w-2 mr-2' />
                    Add Video
                    </>
                )}
                {!isediting && initialData.videoUrl && (
                    <>
                    <Pencil className='h-2 w-2 mr-2' />
                    Edit Video
                    </>
                )}
            </Button>
            </div>
            {!isediting && (
                !initialData.videoUrl ? (
                    <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                        <Video className='h-10 w-10 text-slate-500 ' />
                    </div>
                ) : (
                    <div className='relative aspect-video mt-2'>
                        {/* <Image 
                        alt='upload'
                        fill
                        className='object-cover rounded-md'
                        src={initialData.videoUrl}/> */}
                        <MuxPlayer 
                        playbackId={initialData?.muxData?.playbackId || ""}/>
                    </div>
                )
            )}
             {isediting && (
                    <div>
                        <FileUpload 
                        endpoint='chapterVideo'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({videoUrl: url})
                            }
                        }}/>
                        <div className='text-xs text-mutes-foreground mt-4'>
                            Upload this chapter&apos;s video
                        </div>
                    </div>
            )}
            {initialData.videoUrl && !isediting && (
                <div className='text-xs text-muted-foreground mt-2'>
                    Videos can take a few minutes to process. Refresh the page if the video does not appear
                </div>
            )}
        </div>
    );
};

export default ChapterVideoForm;