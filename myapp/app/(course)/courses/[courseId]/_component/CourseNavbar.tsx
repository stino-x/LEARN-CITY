import NavbarRoutes from '@/components/NavbarRoutes';
import { Chapter, Course, UserProgress } from '@prisma/client';
import React from 'react';
import CourseMobileSideBar from './CourseMobileSideBar';



interface CourseNavbarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    };
    progressCount: number;
}

const CourseNavbar: React.FC<CourseNavbarProps> = ({ course, progressCount }) => {
    // Implement the component logic here

    return (
        <div className='p-4 border-b h-full items-center bg-white shadow-sm'>
            <CourseMobileSideBar course={course} progressCount={progressCount} />
            <NavbarRoutes />
        </div>
    );
};

export default CourseNavbar;