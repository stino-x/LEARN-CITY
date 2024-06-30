import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertTriangle, CheckCircleIcon } from 'lucide-react';
import React from 'react';

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary",
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
)

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon
}

const Banner: React.FC<BannerProps> = ({ label, variant }) => {
    const Icon = iconMap[variant || "warning"]
    return (
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className='h-4 w-4 mr-2' />
            {label}
        </div>
    );
};

export default Banner;