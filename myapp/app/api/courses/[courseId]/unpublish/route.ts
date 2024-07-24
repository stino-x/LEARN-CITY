import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request, {params}: {params : {courseId: string;}}
) {
      try {
        const { userId } = auth()


        if (!userId) {
            return new NextResponse('Unauthorised', {status: 401})
        }

        const courseOwner = await db.course.findUnique({
            where: {
            id: params.courseId,
            userId
            },
        })

        if (!courseOwner) {
            return new NextResponse('Unauthorised', {status: 401})
        }
        
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
            // include: {
            //     chapters: {
            //         include: {
            //             muxData: true,
            //         }
            //     }
            // }
        })

        if (!course) {
            return new NextResponse('Not found', {status: 401})
        }

        // const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished)

        // if (!hasPublishedChapter || !course.title || !course.description || !course.imageUrl || !course.categoryId) {
        //     return new NextResponse('Missing fields', {status: 400})
        // }

        const unpublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: false
            }
        })
        return  NextResponse.json(unpublishedCourse)
      } catch (error) {
        console.log("[COURSE_ID_UNPUBLISH]", error)
        return new NextResponse("internal serval error", { status: 500})
      }
}