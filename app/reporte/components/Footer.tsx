'use client';

import React from 'react';
import Image from 'next/image';
import { VERANO_LOGO, APP_CONFIG } from '@/lib/constants';
import SocialIcons from '@/app/components/SocialIcons';

const Footer = React.memo(() => {
  return (
    <div className="footer flex flex-col sm:flex-row justify-between items-center pt-8 mt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <Image
          src={VERANO_LOGO}
          alt={`${APP_CONFIG.COMPANY} logo`}
          width={60}
          height={60}
          className="rounded-full shadow-md mr-0 sm:mr-4 mb-2 sm:mb-0"
        />
        <p className="text-sm text-muted-foreground font-light">
          &copy; {APP_CONFIG.YEAR} {APP_CONFIG.COMPANY}
        </p>
      </div>
      <SocialIcons />
    </div>
  );
});

Footer.displayName = 'Footer';

export default Footer;
