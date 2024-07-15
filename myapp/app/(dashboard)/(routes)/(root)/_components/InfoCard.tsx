'use client'

import IconBadge from '@/components/IconBadge';
import { LucideIcon, CheckCircle, Clock } from 'lucide-react';
import React from 'react';

interface InfoCardProps {
    iconName: "CheckCircle" | "Clock";
    label: string;
    variant?: "default" | "success"
    numberOfItems: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ iconName, label, variant, numberOfItems }) => {
    const Icon: LucideIcon = iconName === "CheckCircle" ? CheckCircle : Clock;

    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge variant={variant} icon={Icon} />
            <div>
                <p className='font-medium'>
                    {label}
                </p>
                <p className='text-gray-500 text-sm'>
                    {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
                </p>
            </div>
        </div>
    );
};

export default InfoCard;