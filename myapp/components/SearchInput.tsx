'use client'
import { Search } from 'lucide-react';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchInputProps {
    // onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ }) => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get('categoryId');

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                // Make sure to format the title correctly for full-text search
                title: debouncedValue ? debouncedValue.replace(/\s+/g, '&') : null,  // Converts spaces to '&'
            },
        }, { skipNull: true, skipEmptyString: true });
        
        router.push(url);
        
    }, [currentCategoryId, debouncedValue, pathname, router]);

    // const handleSearch = () => {
    //     onSearch(value);
    // };

    return (
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-slate-500" />
            <Input 
                value={value}
                onChange={handleInputChange}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for a course"
            />
        </div>
    );
};

export default SearchInput;
