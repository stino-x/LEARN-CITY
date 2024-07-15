'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

const CourseEnrollButton: React.FC<CourseEnrollButtonProps> = ({ courseId, price }) => {
    // Add your logic for the component here
    const [isLoading, setIsLoading] = React.useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(`/api/courses/${courseId}/checkout`)
            window.location.assign(response.data.url)
        } catch (error) {
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <Button onClick={onClick} disabled={isLoading} className='w-full md:w-auto' size="sm">
            Enroll in Course {courseId} - Price: ${price}
        </Button>
    );
};

export default CourseEnrollButton;