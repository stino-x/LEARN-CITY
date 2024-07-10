import { db } from '@/lib/db';
import { Category, Chapter, Course } from '@prisma/client';
import React from 'react';
import { GetProgress } from './get-progress';

// interface DashboardCoursesProps {
//     courses: string[];
// }

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[]
    inProgressCourses: CourseWithProgressWithCategory[]
}

type CourseWithProgressWithCategory = Course & {
    chapters: Chapter[];
    category: Category;
    progress: number | null;
};

const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course :{
                    include: {
                        category: true,
                        chapters: {
                            where : {
                                isPublished: true,
                            }
                        }
                    
                    }
                }
            },
        });

        const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[]

        for (let course of courses) {
            const progress = await GetProgress(userId, course.id)
            course["progress"] = progress
        }

        const completedCourses = courses.filter((course) => course.progress === 100);

        const inProgressCourses = courses.filter((course) => (course.progress ?? 0) < 100);

        return {
            completedCourses,
            inProgressCourses,
        }


    } catch(error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            inProgressCourses: [],
        }
    }
};

export default getDashboardCourses;