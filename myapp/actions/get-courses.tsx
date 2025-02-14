import { db } from '@/lib/db';
import { Category, Chapter, Course } from '@prisma/client';
import { GetProgress } from './get-progress';

export type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id: string}[]
    progress: number | null
}

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
}

export const getCourses = async ({userId, title, categoryId}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
        // const courses = await db.$queryRaw<CourseWithProgressWithCategory[]>`
        //     SELECT 
        //         c.*,
        //         cat.id AS "categoryId",
        //         cat.name AS "categoryName",
        //         ch.id AS "chapterId",
        //         p.id AS "purchaseId"
        //     FROM "Course" c
        //     LEFT JOIN "Category" cat ON c."categoryId" = cat.id
        //     LEFT JOIN "Chapter" ch ON c.id = ch."courseId" AND ch."isPublished" = true
        //     LEFT JOIN "Purchase" p ON c.id = p."courseId" AND p."userId" = ${userId}
        //     WHERE c."isPublished" = true
        //     AND to_tsvector('english', c.title) @@ plainto_tsquery(${title})
        //     ${categoryId ? `AND c."categoryId" = ${categoryId}` : ''}
        //     ORDER BY c."createdAt" DESC
        // `;


        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId: categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                purchases: {
                    where: {
                        userId,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });


        const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(courses.map(async (course) => {
            if (course.purchases.length === 0) {
                return {
                    ...course,
                    progress: null,
                }
            }
            const progressPercentage = await GetProgress(userId, course.id);
            return {
                ...course,
                progress: progressPercentage,
            }
        }))

        return coursesWithProgress
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return []
    }
};

