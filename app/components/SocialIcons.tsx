import React from 'react';
import { SOCIAL_LINKS } from '@/lib/constants';

const SocialIcons = React.memo(() => {
  return (
    <div className="social-icons flex space-x-4">
      <a
        href={SOCIAL_LINKS.TWITTER}
        aria-label="Twitter"
        className="text-foreground hover:text-primary transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
          <path d="M22 4s-.7 2.1-2 3.4c-.2-.5-1.5-2.2-2.3-3.1L12 8v8c0 2.4-1.9 4-4 4-1.1 0-2.3-.6-3-1.4 0 0-2 1.5-3 2.1 1.7 1.2 3.6 1.9 5.8 1.9 5.3 0 9.7-4.2 9.7-9.7V4H22z"/>
        </svg>
      </a>
      <a
        href={SOCIAL_LINKS.GITHUB}
        aria-label="GitHub"
        className="text-foreground hover:text-primary transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
          <path d="M15 22s-2-2-3-2c-1 0-3 2-3 2v2H6c-2.2 0-4-1.8-4-4V7a4 4 0 0 1 4-4h12c2.2 0 4 1.8 4 4v11c0 2.2-1.8 4-4 4h-3v-2zM9 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      </a>
      <a
        href={SOCIAL_LINKS.TELEGRAM}
        aria-label="Telegram"
        className="text-foreground hover:text-primary transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-telegram">
          <path d="M22 2L11 13 2 9.5l16-6.5zm-5 13l-4 4L7 17l6-5z"/>
        </svg>
      </a>
    </div>
  );
});

SocialIcons.displayName = 'SocialIcons';

export default SocialIcons;
