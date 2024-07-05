import { db } from '@/lib/db';
import React from 'react';
import Categories from './_components/categories';
import SearchInput from '@/components/SearchInput';
import { auth } from '@clerk/nextjs/server';
import { getCourses } from '@/actions/get-courses';
import { redirect } from 'next/navigation';
import CoursesList from '@/components/CoursesList';

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const SearchPage: React.FC<SearchPageProps> = async ({searchParams}) => {
    const {userId} = auth()
    if (!userId) {
        return redirect('/')
    }
    const categories = await db.category.findMany({
        orderBy:{
            name: 'asc'
        }
    })
    const courses = await getCourses({
        userId,
        ...searchParams, 
    })

    return (
        <>
        <div className='px-6 pt-6 md:hidden md:mb-0 block'>
            <SearchInput />
        </div>
        <div className='p-6 space-y-4'>
            {/* Add your JSX content here */}
            <Categories items={categories}/>
            <CoursesList items={courses} />
        </div>
        </>
    );
};

export default SearchPage;