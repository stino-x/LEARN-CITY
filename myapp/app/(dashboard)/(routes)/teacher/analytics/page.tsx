import { getAnalytics } from '@/actions/get-analytics';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import DataCard from './_components/DataCard';
import Chart from './_components/Chart';

interface AnalyticsPageProps {
    // Define the props for the AnalyticsPage component here
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = async () => {
    const { userId } = auth()
    if (!userId) {
        redirect('/')
    }
    const {
        totalRevenue,
        totalSales,
        data,
    } = await getAnalytics(userId)

    return (
        <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <DataCard 
                label='Total Revenue'
                value={totalRevenue}
                shouldFormat
                />
                <DataCard 
                label='Total Sales'
                value={totalSales}
                />
            </div>
            <Chart 
            data={data} 
            />
        </div>
    );
};

export default AnalyticsPage;