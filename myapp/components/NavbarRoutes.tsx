'use client'
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const NavbarRoutes: React.FC = () => {
    const pathname = usePathname()
    // const router = useRouter()
    const isTeacherPage = pathname?.startsWith('/teacher')
    const isPlayerPage = pathname?.startsWith('/chapter')
    return (
        <div className='flex gap-x-2 ml-auto'>
            {isTeacherPage || isPlayerPage ? (
                <Link href="/" >
                <Button size='sm' variant='ghost'>
                    <LogOut className='h-4 w-4 mr-2'/>
                    Exit
                </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses" >
                    <Button size='sm' variant='ghost'>
                        Teacher Mode
                    </Button>
                </Link>
            )}
            <UserButton 
            afterSignOutUrl='/'
            />
        </div>
    );
};

export default NavbarRoutes;