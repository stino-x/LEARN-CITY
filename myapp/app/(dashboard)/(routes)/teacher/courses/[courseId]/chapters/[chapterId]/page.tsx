import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
// import { useParams } from 'react-router-dom';

// interface ChapterIdPageParams {
//     courseId: string;
//     chapterId: string;
// }

const ChapterIdPage  = async (params: {
    courseId: string;
    chapterId: string;
}) => {
    const { userId } = auth()
    if (!userId) {
        return redirect("/")
    }
    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        },
        include: {
            muxData: true,
        },   
    })

    if (!chapter) {
        return redirect("/")
    }

    const requireFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ]

    const totalFields = requireFields.length;
    const completedFields = requireFields.filter (Boolean).length


    const completionText = `(${completedFields}/${totalFields})`

    // const { courseId, chapterId } = useParams<ChapterIdPageParams>();

    // Fetch chapter data based on courseId and chapterId

    return (
        <div className='p-6'>
            <div className='flex items-center justify-between'>
                <div className='w-full'>
                    <Link href={`/teacher/courses/${params.courseId}`} className='flex items-center text-sm hover:opacity-75 transition mb-6'>
                        <ArrowLeft className='h-4 w-4 mr-2' />
                        Back to Course Setup 
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChapterIdPage;