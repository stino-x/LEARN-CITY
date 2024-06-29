import { db } from "@/lib/db"
import Mux from "@mux/mux-node"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
)

export async function POST (
    req: Request, {params}: {params : {courseId: string;  chapterId: string}}
) {
      try {
        const { userId } = auth()
        const{ isPublished, ...values} = await req.json()


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
        
        // const lastChapter = await db.chapter.findFirst({
        //     where: {
        //         courseId: params.courseId
        //     },
        //     orderBy: {
        //         position: 'desc'
        //     }
        
        // });

        // const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values,
            }
        })

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            });

            if (existingMuxData) {
                await Video.Assets.del(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }

            const asset = await Video.Assets.create({
                input: values.videoUrl,
                playback_policy: "public",
                test: false,
            })

            await db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                }
            })
        }
        return  NextResponse.json(chapter)
      } catch (error) {
        console.log("[COURSES_CHAPTER_ID]", error)
        return new NextResponse("internal serval error", { status: 500})
      }
}