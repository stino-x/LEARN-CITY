'use client'
import ConfirmModal from '@/components/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ChapterActionsProps {
    chapterId: string;
    courseId: string;
    disabled: boolean;
    isPublished: boolean;
}

const ChapterActions: React.FC<ChapterActionsProps> = ({ chapterId, isPublished, courseId, disabled }) => {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        try {
            setLoading(true)

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
                toast.success('Chapter unpublished!')
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
                toast.success('Chapter published!')
            }

            router.refresh()
        } catch(error)  {
            console.error("Publish/Unpublish Error:", error);
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    };

    const router = useRouter()

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.error('Chapter deleted')
            router.refresh()
            router.push(`/teacher/courses/${courseId}`)
        } catch(error)  {
            console.error("Publish/Unpublish Error:", error);
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='flex items-center gap-x-2'>
            <Button 
            onClick={onClick}
            disabled={disabled || loading}
            variant="outline"
            size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
            <Button size="sm" disabled={loading}>
                <Trash  className='h-4 w-4' />
            </Button>
            </ConfirmModal>
        </div>
    );
};

export default ChapterActions;