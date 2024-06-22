'use client'
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface SidebarItemProps {
    title: string;
    icon: LucideIcon;
    label: string;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, icon: Icon, label, href }) => {
    const pathname = usePathname()
    const router = useRouter()

    const isActive = (pathname === '/' && href === '/' ) || pathname ===  href || pathname?.startsWith(`${href}/`)
    const onClick = () => {
        router.push(href)
    }
    return (
        <button onClick={onClick} type='button'  className={cn('flex items-center font-[500] pl-6 text-sm text-slate-500 transition-all hover:text-slate-600 hover:bg-slate-300/20 ',
        isActive && 'bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700'
        )}>
            <div className='flex items-center gap-x-2 py-4'>
                <Icon 
                size={22}
                className={cn(' text-slate-500 ',
                    isActive && 'text-sky-700'
                    )}/>
                    {label}
            </div>
            <div
            className={cn(' text-slate-500 ',
                isActive && 'text-sky-700'
                )} />
        </button>
    );
};

export default SidebarItem;