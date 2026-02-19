'use client';

interface AvatarProps {
    name: string;
    imageUrl?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({name, imageUrl, size = 'md'}: AvatarProps){
    return (
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-${size}`}>
            {name}
        </div> 
    );
}