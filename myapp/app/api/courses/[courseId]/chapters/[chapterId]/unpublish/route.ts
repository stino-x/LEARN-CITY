import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request, {params}: {params : {courseId: string; chapterId: string;}}
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
        
        // const chapter = await db.chapter.findUnique({
        //     where: {
        //         id: params.chapterId,
        //         courseId: params.courseId
        //     }
        // })

        // const muxData = await db.muxData.findUnique({
        //     where: {
        //         chapterId: params.chapterId
        //     }
        // })

        // if (!chapter || !muxData || !chapter.description || !chapter.title || !chapter.videoUrl) {
        //     return new NextResponse('Missing required fields', {status: 404})
        // }

        const unpublishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                isPublished: false,
            }
        })

        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            },
        })

        if (publishedChaptersInCourse.length === 0) {
            await db.course.update({
                where: {
                    id: params.courseId
                },
                data: {
                    isPublished: false,
                }
            })
        }
        return  NextResponse.json(unpublishedChapter)
      } catch (error) {
        console.log("[CHAPTER_UNPUBLISH]", error)
        return new NextResponse("internal serval error", { status: 500})
      }
}