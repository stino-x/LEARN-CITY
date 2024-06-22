import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';
import SideBar from './SideBar';

interface MobileSideBarProps {
    // Define the props for the component here
}

const MobileSideBar: React.FC<MobileSideBarProps> = () => {
    // Implement the component logic here

    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className='p-0 bg-white'>
                <SideBar/>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSideBar;