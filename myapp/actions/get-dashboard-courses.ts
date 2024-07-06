import { db } from '@/lib/db';
import { Category, Chapter, Course } from '@prisma/client';
import React from 'react';

interface DashboardCoursesProps {
    courses: string[];
}

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[]
    inProgressCourses: CourseWithProgressWithCategory[]
}

type CourseWithProgressWithCategory = Course & {
    chapters: Chapter[];
    category: Category;
    progress: number | null;
};

const getDashboardCourses: React.FC<DashboardCoursesProps> = async (userId: string): Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await db.course.findMany({
            where: {
                users: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                chapters: {
                    select: {
                        id: true,
                        title: true,
                        isFree: true,
                    },
                },
                category: true,
                userProgress: {
                    where: {
                        userId: userId,
                    },
                    select: {
                        progress: true,
                    },
                },
            },
        });

        const completedCourses: CourseWithProgressWithCategory[] = [];
        const inProgressCourses: CourseWithProgressWithCategory[] = [];

        courses.forEach((course) => {
            const progress = course.userProgress.length ? course.userProgress[0].progress : null;
            const courseWithProgress: CourseWithProgressWithCategory = {
                ...course,
                progress,
            };

            if (progress === 100) {
                completedCourses.push(courseWithProgress);
            } else {
                inProgressCourses.push(courseWithProgress);
            }
        });

        return {
            completedCourses,
            inProgressCourses,
        };

    } catch(error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            inProgressCourses: [],
        }
    }
};

export default getDashboardCourses;