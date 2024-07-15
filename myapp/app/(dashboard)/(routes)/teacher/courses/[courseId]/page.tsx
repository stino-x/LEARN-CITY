import { Metadata } from "next"
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CourseIdForm from './_components/CourseIdForm';

export const metadata: Metadata = {
  title: 'Course',
  description: 'Course details and management',
}

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        }
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        }
      }
    }
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  console.log("Categories:", categories);
  console.log("Course:", course);

  if (!course) {
    return redirect('/');
  }

  return <CourseIdForm 
    course={course} 
    categories={categories}
    courseId={params.courseId}
  />;
};

export default CourseIdPage;