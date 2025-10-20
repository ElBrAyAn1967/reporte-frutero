'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VERANO_LOGO, APP_CONFIG } from '@/lib/constants';

const Header = React.memo(() => {
  return (
    <div className="header flex flex-col items-center mb-6">
      <Link href="/" className="flex items-center mb-4">
        <Image
          src={VERANO_LOGO}
          alt={`${APP_CONFIG.COMPANY} logo`}
          width={120}
          height={120}
          className="rounded-full shadow-lg"
          priority
        />
      </Link>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
