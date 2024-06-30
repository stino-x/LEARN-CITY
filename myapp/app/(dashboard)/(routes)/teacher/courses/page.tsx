import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

interface CoursesPageProps {
    // Define the props for your component here
}

const CoursesPage: React.FC<CoursesPageProps> = async () => {
    // Implement your component logic here
    // const data = await getData()
    const {userId} = auth()

    if (!userId) {
        return redirect('/')
    }

    const courses = await db.course.findMany({
        where: {
            userId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return (
        <div className='p-6'>
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default CoursesPage;