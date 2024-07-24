'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, Pencil, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Course, Chapter } from '@prisma/client';
import toast from 'react-hot-toast';
import * as z from "zod"
import ChaptersList from './ChaptersList';

interface ChaptersFormProps {
    // onSubmit: (description: string) => void;
    // initialData: {
    //     description: string
    // };
    initialData: Course & {chapters: Chapter[]};
    courseId: string
}
const formSchema = z.object({
    title: z.string().min(1),
    // description: z.string().min(1, {
    //     message: 'description is required'
    // })
})

const ChaptersForm: React.FC<ChaptersFormProps> = ({ initialData, courseId }) => {
    const [isUpdating, setisUpdating] = useState(false);
    const [isCreating, setisCreating] = useState(false);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success('Chapter Created')
            toggleCreating()
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const onReorder = async (updateData: {id: string; position: number}[]) => {
        setisUpdating(true);
        try {
            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            });
            toast.success('Chapters reordered');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setisUpdating(false); // Ensure this runs whether the request succeeded or failed
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }

    const toggleCreating = () => setisCreating((current) => !current)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onSubmit(description);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: ""},
    })

    const {isSubmitting, isValid} = form.formState;
    const router = useRouter()



    return (
        <div className='relative mt-6 border p-4 rounded-md bg-slate-100'>
            {isUpdating && (
                <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
                    <Loader2 className='animate-spin w-6 h-6 text-sky-700'/>
                </div>
            )}
            <div className='font-medium flex justify-between items-center'>
                Course chapters
                <Button onClick={toggleCreating} variant="ghost">
                {isCreating && (
                    <>Cancel</>
                )}
                {!isCreating && (
                    <>
                    <PlusCircle className='h-2 w-2 mr-2' />
                    Add a Chapter
                    </>
                )}
            </Button>
            </div>
            {/* {!isCreating && (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-slate-500 italic"
                    )}>
                    {initialData.description || "No description"}
                    </p>
            )} */}
             {isCreating && (
                    <Form {...form}>
                        <form className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField 
                                control={form.control}
                                name='title'
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Intro to a course'"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                    <Button 
                                    disabled={!isValid || isSubmitting}
                                    type='submit'>
                                        Create
                                    </Button>
                                    {/* <Button 
                                    variant='ghost'
                                    type='button'
                                    onClick={() => toggleEdit()}>
                                        Cancel
                                    </Button> */}

                        </form>
                    </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && "No chapters"}
                    {/* {initialData.chapters.map((chapter) => (
                        <div key={chapter.id} className='flex justify-between items-center'>
                            <p>{chapter.title}</p>
                            <Button variant='ghost'>
                                Edit
                            </Button>
                        </div>
                    ))} */}
                    <ChaptersList 
                    onEdit={onEdit}
                    onReorder={onReorder}
                    items={initialData.chapters || []}/>
                </div>
            )}
            {!isCreating && (
                <p className='text-xs text-muted-foreground mt-4'>
                    Drag and Drop to reorder the chapters
                </p>
            )}
        </div>
    );
};

export default ChaptersForm;