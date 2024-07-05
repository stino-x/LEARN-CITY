import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

// interface CourseIdPageProps {
//     courseId: string;
// }

const CourseIdPage = async ({ params }: {params: {courseId: string}}) => {
    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                // include: {
                //     userProgress: {
                //         where: {
                //             userId
                //         }
                //     }
                // },
                orderBy :{
                    position: "asc"
                }
            }
        }
    })

    if (!course) {
        return redirect('/')
    }

    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;