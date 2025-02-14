'use client'
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryItemProps {
    key: string;
    label: string;
    icon: IconType;
    value: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ key, label, icon: Icon, value }) => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCategoryId = searchParams.get('categoryId')
    const currentTitle = searchParams.get('title')
    const isSelected = currentCategoryId === value
    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: isSelected ? null : value,
                title: currentTitle ? currentTitle.replace(/\s+/g, '&') : null,  // Converts spaces to '&' for full-text search
            }
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
        
    }
    return (
        <button className={
            cn('py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition',
                isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800'
            )
        } onClick={onClick}>
            {Icon && <Icon size={20} />}
            <div className='truncate'>
                {label}
            </div>
        </button>
    );
};

export default CategoryItem;