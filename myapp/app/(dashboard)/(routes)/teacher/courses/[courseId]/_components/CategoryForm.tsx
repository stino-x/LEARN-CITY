'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Course, Category } from '@prisma/client';
import toast from 'react-hot-toast';
import * as z from "zod"
import { ComboboxDemo } from '@/components/ui/combobox';

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: Category[];
}

const formSchema = z.object({
    categoryId: z.string().min(1),
})

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, courseId, options }) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    console.log("initialData.cATEGORYiD", initialData.categoryId);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { categoryId: initialData?.categoryId || "" }
    })

    console.log("Categories in Category form:", options);

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success('Course updated')
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const toggleEdit = () => setIsEditing((current) => !current);

    const mappedOptions = options.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    console.log("Initial data:", initialData);
    console.log("Course ID:", courseId);
    console.log("Options:", options);


    console.log("Mapped options:", mappedOptions); // Log mapped options to verify data

    const selectedOption = mappedOptions.find((option) => option.value === initialData.categoryId);


    return (
        <div className='mt-6 border p-4 rounded-md bg-slate-100'>
            <div className='font-medium flex justify-between items-center'>
                Course category
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.categoryId && "text-slate-500 italic"
                )}>
                    {selectedOption?.label || "No category"}
                </p>
            )}
            {isEditing && (
    <Form {...form}>
        <form className='space-y-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
                control={form.control}
                name='categoryId'
                render={({field}) => {
                    console.log("Field value:", field.value);  // Added console log here
                    return (
                        <FormItem>
                            <FormControl>
                                <ComboboxDemo 
                                    options={mappedOptions}
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        console.log("Selected category:", value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
            <div className='flex items-center gap-x-2'>
                <Button 
                    disabled={!isValid || isSubmitting}
                    type='submit'>
                    Save
                </Button>
            </div>
        </form>
    </Form>
)}
        </div>
    );
};

export default CategoryForm;