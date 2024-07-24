import Image from 'next/image';
import React from 'react';

// interface LogoProps {
//     text: string;
// }

const Logo = () => {
    return (
        <Image 
        height={180}
        width={180}
        alt='logo'
        src='/logo2.png'
        />
    );
};

export default Logo;