'use client'

import { Card } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import React from 'react';

interface ChartProps {
    data: {
        name: string;
        total: number
    }[]
}

const Chart: React.FC<ChartProps> = ({data}) => {
    // Add your chart logic here

    return (
        <Card>
            <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis 
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}/>
                        <YAxis
                        tickFormatter={(value) => `${value}`}
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}/>
                        <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
                    </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default Chart;