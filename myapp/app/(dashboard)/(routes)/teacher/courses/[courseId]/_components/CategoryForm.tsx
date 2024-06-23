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
import { Course } from '@prisma/client';
import toast from 'react-hot-toast';
import * as z from "zod"
import { ComboboxDemo } from '@/components/ui/combobox';

interface CategoryFormProps {
    // onSubmit: (description: string) => void;
    // initialData: {
    //     description: string
    // };
    initialData: Course
    courseId: string
    options: {label: string; value: string;}[];
}
const formSchema = z.object({
    categoryId: z.string().min(1),
})

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, courseId, options }) => {
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

    const selectedOption = options.find((option) => option.value === initialData.category)

    const toggleEdit = () => setisediting((current) => !current)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onSubmit(description);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { categoryId: initialData?.categoryId || "" }
    })

    const {isSubmitting, isValid} = form.formState;
    const router = useRouter()



    return (
        <div className='mt-6 border p-4 rounded-md bg-slate-100'>
            <div className='font-medium flex justify-between items-center'>
                Course category
                <Button onClick={() => toggleEdit()} variant="ghost">
                {isediting && (
                    <>Cancel</>
                )}
                {!isediting && (
                    <>
                    <Pencil className='h-2 w-2 mr-2' />
                    Edit category
                    </>
                )}
            </Button>
            </div>
            {!isediting && (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && "text-slate-500 italic"
                    )}>
                    {selectedOption?.label || "No category"}
                    </p>
            )}
             {isediting && (
                    <Form {...form}>
                        <form action="" className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField 
                                control={form.control}
                                name='categoryId'
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            {/* <Textarea 
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'this course is about...'"
                                            {...field}
                                            /> */}
                                            <ComboboxDemo 
                                              options={{...options}}
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

export default CategoryForm;