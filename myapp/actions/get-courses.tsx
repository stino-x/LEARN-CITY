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
        const courses = await db.$queryRaw`
  SELECT * FROM "Course"
  WHERE "isPublished" = true
  AND to_tsvector('english', title) @@ plainto_tsquery(${title})
  ${categoryId ? `AND "categoryId" = ${categoryId}` : ''}
  ORDER BY "createdAt" DESC
`;


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

