'use client'
import { Category } from '@prisma/client';
import { IconType } from 'react-icons';
import { FcMusic, FcOldTimeCamera, FcSportsMode, FcSalesPerformance, FcMultipleDevices, FcFilmReel, FcEngineering } from 'react-icons/fc';
import CategoryItem from './CategoryItem';

// interface Category {
//     id: number;
//     name: string;
// }

interface CategoriesProps {
    items: Category[];
}

const iconMap:Record<Category['name'], IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Computer Science": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering

}

const Categories: React.FC<CategoriesProps> = ({ items }) => {
    return (
        <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
                {items.map((category) => (
                    <CategoryItem
                    key={category.id}
                    label={category.name}
                    icon={iconMap[category.name]}
                    value={category.id} />
                ))}
            
        </div>
    );
};

export default Categories;