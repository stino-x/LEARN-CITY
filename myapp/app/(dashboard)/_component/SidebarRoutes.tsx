'use client'

import { BarChart, Compass, Layout, List } from 'lucide-react';
import React from 'react';
import SidebarItem from './SidebarItem ';
import { usePathname } from 'next/navigation';

// interface SidebarRoutesProps {
//     routes: {
//         path: string;
//         name: string;
//     }[];
// }
const guestRutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: '/'
    },
    {
        icon: Compass,
        label: "Browse",
        href: '/search'
    }
];

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: '/teacher/courses'
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: '/teacher/analytics'
    }
];

const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.includes('/teacher')
    const routes  = isTeacherPage ? teacherRoutes : guestRutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                // <Link to={route.path} key={route.path} className="flex items-center justify-start p-4 hover:bg-gray-100">
                //     <route.icon className="w-6 h-6 mr-2" />
                //     <span>{route.name}</span>
                // </Link>
                <SidebarItem 
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                />
            ))}
        </div>
    );
};

export default SidebarRoutes;