import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({userId, courseId, chapterId}: GetChapterProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    courseId: courseId,
                    userId
                }
            }
        
        })

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true,
            },
            select: {
                price: true
            }
        })

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true
            },
        })

        if (!chapter || !course) {
            throw new Error("Chapter or course not found")
        }

        let muxData = null

        let attachments: Attachment[] = [];

        let nextChapter: Chapter | null = null;


        if (purchase) {
            attachments = await db.attachment.findMany({
                where: {
                    courseId: courseId
                }
            })

            // muxData = await db.muxData.findUnique({
            //     where: {
            //         chapterId
            //     }
            // })

            // const chapters = await db.chapter.findMany({
            //     where: {
            //         courseId,
            //         isPublished: true
            //     },
            //     orderBy: {
            //         position: "asc"
            //     }
            // })

            // const currentChapterIndex = chapters.findIndex((c) => c.id === chapterId)

            // if (currentChapterIndex < chapters.length - 1) {
            //     nextChapter = chapters[currentChapterIndex + 1]
            // }
            
        }

        if (chapter.isFree || purchase) {
             muxData = await db.muxData.findUnique({
                 where: {
                     chapterId
                 }
             })
        }

        nextChapter = await db.chapter.findFirst({
            where: {
                courseId,
                isPublished: true,
                position: {
                    gt: chapter?.position
                }
            },
            orderBy: {
                position: "asc"
            }
     })

     const userProgress = await db.userProgress.findUnique({
        where: {
            userId_chapterId: {
                chapterId: chapterId,
                userId
            }
        }
     })

     return {
            chapter,
            course,
            userProgress,
            nextChapter,
            purchase,
            attachments,
            muxData,
     }
    } catch (error) {
        console.log("[GET_CHAPTER]", error)
        return {
            chapter: null,
            course: null,
            userProgress: null,
            nextChapter: null,
            purchase: null,
            attachments: [],
            muxData: null,
        }
    }
}