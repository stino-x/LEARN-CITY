// app/teacher/courses/[courseId]/chapters/[chapterId]/ChapterClientComponent.tsx
'use client';

import IconBadge from '@/components/IconBadge';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ChapterTitleForm from './ChapterTitleForm';
import ChapterDescriptionForm from './ChapterDescriptionForm';
import ChapterAccessForm from './ChapterAccessForm';
import ChapterVideoForm from './ChapterVideoForm';
import Banner from '@/components/banner';
import ChapterActions from './ChapterActions';
import { Chapter } from '@prisma/client';
interface ChapterClientComponentProps {
  chapter: Chapter;
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterClientComponent: React.FC<ChapterClientComponentProps> = ({ chapter, params }) => {
  const requireFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ];

  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requireFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner variant="warning" label="This chapter is unpublished it will not be visible in the course" />
      )}
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
            <Link href={`/teacher/courses/${params.courseId}`} className='flex items-center text-sm hover:opacity-75 transition mb-6'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Course Setup
            </Link>
            <div className='flex justify-between items-center w-4'>
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>
                  Chapter Creation
                </h1>
                <span className='text-sm font-slate-700'>Complete all fields{completionText}</span>
              </div>
              <ChapterActions disabled={!isComplete} courseId={params.courseId} chapterId={params.chapterId} isPublished={chapter.isPublished} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className='space-y-4'>
            <div>
              <div className='flex-items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard} />
                <h2 className='text-xl'>
                  Customize your chapter
                </h2>
              </div>
              <ChapterTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
              <ChapterDescriptionForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <IconBadge icon={Eye} />
                <h2 className='text-xl'>
                  Access Settings
                </h2>
              </div>
              <ChapterAccessForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
            </div>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Video} />
              <h2 className='text-xl'>
                Add a video
              </h2>
            </div>
            <ChapterVideoForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterClientComponent;
