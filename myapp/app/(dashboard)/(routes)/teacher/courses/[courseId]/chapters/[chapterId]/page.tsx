// app/teacher/courses/[courseId]/chapters/[chapterId]/page.tsx

import IconBadge from '@/components/IconBadge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import ChapterTitleForm from './_components/ChapterTitleForm';
import ChapterDescriptionForm from './_components/ChapterDescriptionForm';
import ChapterAccessForm from './_components/ChapterAccessForm';
import ChapterVideoForm from './_components/ChapterVideoForm';
import Banner from '@/components/banner';
import ChapterActions from './_components/ChapterActions';
import ChapterClientComponent from './_components/ChapterClientComponent';

interface ChapterIdPageProps {
    params: {
        courseId: string;
        chapterId: string;
    };
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
    const { courseId, chapterId } = params;
    const { userId } = auth();
    
    if (!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: chapterId,
            courseId: courseId
        },
        include: {
            muxData: true,
        },   
    });

    if (!chapter) {
        return redirect("/");
    }

    const requireFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ];

    const totalFields = requireFields.length;
    const completedFields = requireFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requireFields.every(Boolean);

    return <ChapterClientComponent chapter={chapter} params={params} />;
};

export default ChapterIdPage;
