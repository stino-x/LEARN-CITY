import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!
});
const { video } = mux;

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Attempt to delete associated Mux assets, if they exist
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        try {
          await video.assets.delete(chapter.muxData.assetId);
        } catch (error) {
          console.log(`Failed to delete Mux asset ${chapter.muxData.assetId}:`, error);
          // Proceed with the next chapter even if this one fails
        }
      }
    }

    // Delete the course from the database
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function PATCH (
  req: Request, {params}: {params : {courseId: string}}
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId || !isTeacher(userId)) {
        return new NextResponse('Unauthorised', {status: 401});
    }

    const course = await db.course.update({
        where: {
          id: courseId,
          userId
        },
        data: {
          ...values,
        },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("internal server error", { status: 500});
  }
}
