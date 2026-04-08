// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/timetable', label: 'Timetable' },
  { href: '/map', label: 'Campus Map' },
  { href: '/canteen', label: 'Canteen' },
  { href: '/lost-found', label: 'Lost & Found' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-emerald-700">
            Crestwood
          </Link>

          {/* Desktop Navigation - Always Visible */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-700 ${
                  pathname === link.href
                    ? 'text-emerald-700 border-b-2 border-emerald-700 pb-1'
                    : 'text-gray-600'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}