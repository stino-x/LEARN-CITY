'use client'

import { Compass, Layout } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem ';

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

const SidebarRoutes = () => {
    const routes  = guestRutes
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