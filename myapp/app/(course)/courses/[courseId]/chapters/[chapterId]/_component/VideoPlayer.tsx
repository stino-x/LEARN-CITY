'use client'

import { useConfettiStore } from '@/hooks/use-confetti-store';
import { cn } from '@/lib/utils';
import MuxPlayer from '@mux/mux-player-react';
import { Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface VideoPlayerProps {
    chapterId: string;
    title: string;
    courseId: string;
    nextChapterId?: string;
    playbackId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    chapterId,
    title,
    courseId,
    nextChapterId,
    playbackId,
    isLocked,
    completeOnEnd,
}) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isReady, setIsReady] = React.useState(false);

    const onEnd = async () => {
        try {
            if(completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });
                if (!nextChapterId){
                    confetti.onOpen();
                }
                toast.success("Progress Updated")
                router.refresh()
                if(nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`) 
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='relative aspect-video'>
            {!isReady && !isLocked && (
                <div className='absolute inset-0 flex items-center justify-center bg-slate-800'>
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className='absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary'>
                    <Lock className='h-8 w-8'/>
                    <p className='text-sm'>
                        This Chapter is Locked
                    </p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                    title={title}
                    className={cn(!isReady && 'hidden')}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnd}
                    autoPlay
                    playbackId={playbackId}
                />
            )}
        </div>
    );
};

export default VideoPlayer;
