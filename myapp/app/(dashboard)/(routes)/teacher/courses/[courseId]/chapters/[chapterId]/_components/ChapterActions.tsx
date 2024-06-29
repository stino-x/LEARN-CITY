'use client'
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import React from 'react';

interface ChapterActionsProps {
    chapterId: string;
    courseId: string;
    disabled: boolean;
    isPublished: boolean;
}

const ChapterActions: React.FC<ChapterActionsProps> = ({ chapterId, isPublished, courseId, disabled }) => {
    const handleEdit = () => {
        // Handle edit logic here
    };

    const handleDelete = () => {
        // Handle delete logic here
    };

    return (
        <div className='felx items-center gap-x-2'>
            <Button 
            onClick={() => {}}
            disabled={disabled}
            variant="outline"
            size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button size="sm">
                <Trash  className='h-4 w-4' />
            </Button>
        </div>
    );
};

export default ChapterActions;