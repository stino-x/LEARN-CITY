import IconBadge from '@/components/IconBadge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

interface CourseIdProps {
    courseId: string;
}

const CourseId: React.FC<CourseIdProps> = async ({ courseId }) => {
    const { userId } = auth()
    if (!userId) {
        return redirect('/')
    }
    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
    });
    if (!course) {
        return redirect('/')
    }
    const requiredFields = [
        course.title,
        course.description,
        course.categoryId,
        course.imageUrl,
        course.price
    ] 

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `(${completedFields} / ${totalFields})`
    return (
        <div className='p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-2xl font-medium'>Course Setup</h1>
                    <span className='text-sm text-slate-700'>Complete All Fields{completionText}</span>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard}/>
                        <h2 className='text-xl'>Customize your course</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseId;