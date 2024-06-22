import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

interface CoursesPageProps {
    // Define the props for your component here
}

const CoursesPage: React.FC<CoursesPageProps> = () => {
    // Implement your component logic here

    return (
        <div className='p-6'>
            <Link href="/teacher/create">
                <Button>
                    New Courses
                </Button>
            </Link>
        </div>
    );
};

export default CoursesPage;