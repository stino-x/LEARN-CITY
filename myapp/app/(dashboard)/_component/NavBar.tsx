import React from 'react';
import MobileSideBar from './MobileSideBar';
import NavbarRoutes from '@/components/NavbarRoutes';

const NavBar: React.FC = () => {
    return (
        <div className='p-4 shadow-sm h-full flex items-center bg-white border-b'>
            <MobileSideBar />
            <NavbarRoutes />
        </div>
    );
};

export default NavBar;