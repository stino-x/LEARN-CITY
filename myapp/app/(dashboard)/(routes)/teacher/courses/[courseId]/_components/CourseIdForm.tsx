'use client';

import React from 'react';
import IconBadge from '@/components/IconBadge';
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react';
import TitleForm from './TitleForm';
import DescriptionForm from './DescriptionForm';
import ImageForm from './ImageForm';
import CategoryForm from './CategoryForm';
import PriceForm from './PriceForm';
import AttachmentForm from './AttachmentForm';
import ChaptersForm from './ChaptersForm';
import Banner from '@/components/banner';
import Actions from './Actions';
import { Category, Course } from '@prisma/client';

interface CourseIdFormProps {
  course: any; // Replace 'any' with your actual Course type
  categories: Category[]; // Replace 'any' with your actual Category type
  courseId: string;
}

const CourseIdForm: React.FC<CourseIdFormProps> = ({ course, categories, courseId }) => {
  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.imageUrl,
    course.price,
    course.chapters.some((chapter: any) => chapter.isPublished)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  console.log("Course variable feeding initialdata in category form", course);

  return (
    <>
      {!course.isPublished && (
        <Banner label='This course is unpublished. It will not be visible to the students' />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700">
              Complete All Fields {completionText}
            </span>
          </div>
          <Actions disabled={!isComplete} courseId={courseId} isPublished={course.isPublished} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            
            {/* console.log("Categories in Courseid page:", categories); */}

            <CategoryForm
             initialData={course}
             courseId={course.id}
             options={categories}
            />

          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources and Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdForm;