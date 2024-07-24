import React from 'react';
import Logo from './Logo';
import SidebarRoutes from './SidebarRoutes';

interface SideBarProps {
    // Define the props for the SideBar component here
}

const SideBar: React.FC<SideBarProps> = () => {
    // Implement the SideBar component logic here

    return (
        <div className='h-full flex flex-col shadow-sm overflow-y-auto bg-white border-r'>
            <div className='p-6'>
                <Logo />
            </div>
            <div className='flex flex-col w-full'>
                <SidebarRoutes />
            </div>
        </div>
    );
};

export default SideBar;