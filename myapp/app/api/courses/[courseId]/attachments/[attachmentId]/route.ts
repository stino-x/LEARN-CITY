import { db } from "@/lib/db"
import { isTeacher } from "@/lib/teacher"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE (
    req: Request,
    {params}: {params : {courseId: string, attachmentId: string}}
) {
    try {
        const { userId } = auth()
        const {url} = await req.json()


        if (!userId || !isTeacher(userId)) {
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
        // const { courseId, attachmentId } = req.query
        const attachment = await db.attachment.delete({
            where: {
                courseId: params.attachmentId,
                id: params.courseId
            },
        })
        return  NextResponse.json(attachment)
    } catch (error) {
        console.log("ATTACHMENT_ID", error)
        return new NextResponse("internal serval error", { status: 500})
    }
}