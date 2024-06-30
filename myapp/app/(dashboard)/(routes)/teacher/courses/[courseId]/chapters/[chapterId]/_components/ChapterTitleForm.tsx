'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from "zod"

interface ChapterTitleFormProps {
    // onSubmit: (title: string) => void;
    initialData: {
        title: string;
    };
    courseId: string;
    chapterId: string;
}
const formSchema = z.object({
    title: z.string().min(1)
})

const ChapterTitleForm: React.FC<ChapterTitleFormProps> = ({ initialData, courseId, chapterId }) => {
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
        // onSubmit(title);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    })

    const {isSubmitting, isValid} = form.formState;
    const router = useRouter()



    return (
        <div className='mt-6 border p-4 rounded-md bg-slate-100'>
            <div className='font-medium flex justify-between items-center'>
                Chapter Title
                <Button onClick={() => toggleEdit()} variant="ghost">
                {isediting && (
                    <>Cancel</>
                )}
                {!isediting && (
                    <>
                    <Pencil className='h-2 w-2 mr-2' />
                    Edit Title
                    </>
                )}
            </Button>
            </div>
            {!isediting && (
                    <p className='text-sm mt-2'>
                    {initialData.title}
                    </p>
            )}
             {isediting && (
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
                                            placeholder='e.g Intro to the Course'
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

export default ChapterTitleForm;