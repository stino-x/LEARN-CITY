import { getChapter } from '@/actions/get-chapter';
import Banner from '@/components/banner';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import VideoPlayer from './_component/VideoPlayer';
import CourseEnrollButton from './_component/CourseEnrollButton';
import { Separator } from '@/components/ui/separator';
import Preview from '@/components/preview';
import { File } from 'lucide-react';
import CourseProgressButton from './_component/CourseProgressButton';

interface ChapterIdPageProps {
    chapterId: string;
}

const ChapterIdPage = async ({ params }: {params:{ courseId: string; chapterId: string }}) => {
    const { userId } = auth()
    if (!userId) {
        return redirect('/')
    }
    const {
            chapter,
            course,
            userProgress,
            nextChapter,
            purchase,
            attachments,
            muxData,
      } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId
    });

    if (!chapter || !course) {
        return redirect('/')
    }

    const isLocked = !chapter.isFree && !purchase
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner
                variant="success"
                label="You already completed this chapter" />
            )}
            {isLocked && (
                <Banner
                variant="warning"
                label="You need to purchase this course to watch this chapter" />
            )}
            <div className='flex flex-col max-w-4xl mx-auto pb-20'>
                <div className='p-4'>
                    <VideoPlayer chapterId={params.chapterId} title={chapter.title} courseId={params.courseId} nextChapterId={nextChapter?.id} playbackId={muxData?.playbackId!} isLocked={isLocked} completeOnEnd={completeOnEnd} />
                </div>
                <div>
                    <div className='p-4 flex flex-col items-center justify-between md:flex-row'>
                        <h2 className='text-2xl font-semibold mb-2'>
                        {chapter.title}
                        </h2>
                        {purchase ? (
                                <CourseProgressButton chapterId={params.chapterId} courseId={params.courseId} nextChapterId={nextChapter?.id} isCompleted={!!userProgress?.isCompleted} />
                        ) : (
                            <CourseEnrollButton courseId={params.courseId} price={course.price!} />
                        )}
                    </div>
                    <Separator />
                    <div>
                        <Preview value={chapter.description!} />
                    </div>
                    {!!attachments.length && (
                        <>
                        <Separator />
                        <div className='p-4'>
                            {attachments.map((attachment) => (
                                    <a className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline' key={attachment.id} href={attachment.url} target='_blank'><File /><p className='line-clamp-1'>{attachment.name}</p></a>
                            ))}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterIdPage;