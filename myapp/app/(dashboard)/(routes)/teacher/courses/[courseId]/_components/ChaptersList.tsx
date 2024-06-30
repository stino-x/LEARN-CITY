'use client'

import { cn } from '@/lib/utils';
import { Chapter } from '@prisma/client';
import { Pencil, Badge, Grip } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// interface Chapter {
//     id: string;
//     title: string;
// }

interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: {id: string; position: number}[]) => void;
    onEdit: (id: string) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ items, onReorder, onEdit }) => {
    const [isMounted, setisMounted] = useState(false)
    const [chapters, setisChapters] = useState(items)
    useEffect(() => {
        setisMounted(true)
    }, []);

    useEffect(() => {
        setisChapters(items)
    }, [items]);

    if (!isMounted) {
        return null;
    }

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedChapters = Array.from(chapters);
        const [removed] = reorderedChapters.splice(result.source.index, 1);
        reorderedChapters.splice(result.destination.index, 0, removed);

        setisChapters(reorderedChapters);

        onReorder(
            reorderedChapters.map((chapter, index) => ({
                id: chapter.id,
                position: index,
            }))
        );
    };
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) =>(
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                {(provided) => (
                                    <div
                                        className={cn(
                                            "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                            chapter.isPublished && "bg-sky-100 border-shy-200 text-sky-700"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                        className={cn(
                                            "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300  rounded-l-md transition",
                                            chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                        )}
                                        {...provided.dragHandleProps}
                                        >
                                            <Grip
                                            className='h-5 w-5' />
                                        </div>
                                            {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {chapter.isFree && (
                                                <Badge>
                                                    Free
                                                </Badge>
                                            )}
                                            <Badge 
                                            className={cn(
                                                "bg-slate-500",
                                                chapter.isPublished && "bg-sky-700"
                                            
                                            )}>
                                                {chapter.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                            <Pencil 
                                            onClick = {() => onEdit(chapter.id)}
                                            className='h-4 w-4 cursor-pointer hover:opacity-75 transition'/>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ChaptersList;