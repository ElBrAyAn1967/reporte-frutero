import React from 'react';
import Image from 'next/image';

const navigation = [
  {
    name: 'Farcaster',
    href: 'https://warpcast.com/~/channel/fruteroclub',
    icon: 'fa-brands fa-mastodon',
  },
  {
    name: 'X',
    href: 'https://twitter.com/fruteroclub',
    icon: 'fa-brands fa-x-twitter',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/fruteroclub',
    icon: 'fa-brands fa-telegram',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/fruteroclub',
    icon: 'fa-brands fa-github',
  },
];

export default function Footer({ isHomePage = false }: { isHomePage?: boolean }) {
  return (
    <footer className="w-full bg-background border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between md:px-6 md:py-6 lg:px-8">
        <div className="flex items-center justify-center gap-x-8 md:order-2">
          {navigation.map((item) => (
            <div key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                <span className="sr-only">{item.name}</span>
                <i
                  className={`${item.icon} ${
                    item.name === 'Telegram'
                      ? 'text-2xl'
                      : 'text-xl'
                  } text-foreground hover:text-primary`}
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          ))}
        </div>

        {!isHomePage && (
          <div className="flex items-center justify-center gap-x-3 md:order-1 md:min-w-1/3 md:justify-start mt-4 md:mt-0">
            <Image
              src="https://red-causal-armadillo-397.mypinata.cloud/ipfs/bafkreiejgeokgt62gygh3e3frfm5e6xjmjyallf4ixpvv3nchh2uu4my7u"
              alt="Frutero logo"
              width={512}
              height={512}
              className="w-28 transition duration-300 ease-in-out hover:scale-90"
            />
            <p className="text-center text-lg leading-5 text-foreground">
              &copy; 2025
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
