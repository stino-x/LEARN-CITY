'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Chapter, Course } from '@prisma/client';
import toast from 'react-hot-toast';
import * as z from "zod"
import Editor from '@/components/editor';
import Preview from '@/components/preview';

interface ChapterDescriptionFormProps {
    // onSubmit: (description: string) => void;
    // initialData: {
    //     description: string
    // };
    initialData: Chapter
    courseId: string
    chapterId: string
}
const formSchema = z.object({
    description: z.string().min(1, {
        message: 'description is required'
    })
})

const ChapterDescriptionForm: React.FC<ChapterDescriptionFormProps> = ({ initialData, courseId, chapterId }) => {
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


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onSubmit(description);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { description: initialData?.description || ""},
    })

    const {isSubmitting, isValid} = form.formState;
    const router = useRouter()



    return (
        <div className='mt-6 border p-4 rounded-md bg-slate-100'>
            <div className='font-medium flex justify-between items-center'>
                Chapter description
                <Button onClick={() => toggleEdit()} variant="ghost">
                {isediting && (
                    <>Cancel</>
                )}
                {!isediting && (
                    <>
                    <Pencil className='h-2 w-2 mr-2' />
                    Edit description
                    </>
                )}
            </Button>
            </div>
            {!isediting && (
                    <div className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-slate-500 italic"
                    )}>
                    {!initialData.description && "No description"}
                    {initialData.description && (
                        <Preview value={initialData.description} />
                    )}
                    </div>
            )}
             {isediting && (
                    <Form {...form}>
                        <form className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField 
                                control={form.control}
                                name='description'
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Editor
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <div className='flex items-center gap-x-2'>
                                    <Button 
                                    disabled={!isValid || isSubmitting}
                                    type='submit'>
                                        Save
                                    </Button>
                                    {/* <Button 
                                    variant='ghost'
                                    type='button'
                                    onClick={() => toggleEdit()}>
                                        Cancel
                                    </Button> */}
                                </div>
                        </form>
                    </Form>
            )}
        </div>
    );
};

export default ChapterDescriptionForm;