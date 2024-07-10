// import { UserButton } from '@clerk/nextjs';
// import React from 'react';

import getDashboardCourses from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/CoursesList";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/InfoCard";



export default async function Dashboard()  {
    const { userId } = auth()
    if (!userId) {
        redirect("/")
    }

     const { completedCourses, inProgressCourses } = await getDashboardCourses(userId)

    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard    
                icon={Clock}
                label="In Progress"
                numberOfItems={inProgressCourses.length}/>
                <InfoCard    
                icon={CheckCircle}
                label="Completed"
                variant="success"
                numberOfItems={completedCourses.length}/>
            </div>
            <CoursesList items={[...completedCourses, ...inProgressCourses]} />
        </div>
    );
};

