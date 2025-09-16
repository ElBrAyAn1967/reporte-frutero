import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  veranologo: string;
}

export default function Header({ veranologo }: HeaderProps) {
  return (
    <div className="header flex flex-col items-center mb-6">
      <Link href="/" className="flex items-center mb-4">
        <Image
          src={veranologo}
          alt="Company logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
      </Link>
    
    </div>
  );
}