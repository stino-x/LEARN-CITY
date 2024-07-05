'use client'
import { Button } from '@/components/ui/button';
import React from 'react';

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

const CourseEnrollButton: React.FC<CourseEnrollButtonProps> = ({ courseId, price }) => {
    // Add your logic for the component here
    
    return (
        <Button onClick={() => console.log('Enroll button clicked')} className='w-full md:w-auto' size="sm">
            Enroll in Course {courseId} - Price: ${price}
        </Button>
    );
};

export default CourseEnrollButton;