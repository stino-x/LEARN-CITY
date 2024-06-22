'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from "zod"

interface CreatePageProps {
    // Add any props you need here
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required',
    }),
})

const CreatePage: React.FC<CreatePageProps> = () => {
    const [formData, setFormData] = useState({
        // Add your form fields here
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    })

    const {isSubmitting, isValid} = form.formState;
    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`)
            toast.success('Course Created')
            console.log(response.data);
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'>Name your Course</h1>
                <p className='text-sm text-slate-600'>What would you like to name your course, you can optionally change this later</p>
                <Form {...form}>
                    <form action="" onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
                        <FormField
                         control={form.control}
                         name="title"
                         render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Course Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting}
                                    placeholder="'e.g advanced web dev'"
                                    {...field} />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this Course
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                         )}
                         />
                         <div className='flex items-center gap-x-2'>
                            <Link href='/'>
                                <Button variant='ghost' type='button'>
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                            type='submit'
                            disabled={!isValid || isSubmitting}>
                                    Continue
                            </Button>
                         </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreatePage;
