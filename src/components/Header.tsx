'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-zinc-900 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image width={200} height={50} src="/images/logo-full.png" alt="Frengage Logo" />
            </div>
            <nav className="hidden md:block">
              <div className="flex space-x-4 items-center bg-zinc-800 rounded-full px-6 py-1 outline outline-1 outline-zinc-600">
                <Link href="/" className={`px-4 py-2 rounded-full text-md transition duration-150 ${
                  isActive('/') 
                    ? 'bg-zinc-700 font-bold text-orange-50' 
                    : 'font-normal text-orange-50 hover:text-orange-300'
                }`}>
                  <FontAwesomeIcon icon="house" className="mr-1" />
                  Home
                </Link>
                <Link href="/quizvault" className={`px-4 py-2 rounded-full text-md transition duration-150 ${
                  isActive('/quizvault') 
                    ? 'bg-zinc-700 font-bold text-orange-50' 
                    : 'font-normal text-orange-50 hover:text-orange-300'
                }`}>
                  <FontAwesomeIcon icon="clock-rotate-left" className="mr-1" />
                  Past Quizzes
                </Link>
                <Link href="/scheduled" className={`px-4 py-2 rounded-full text-md transition duration-150 ${
                  isActive('/scheduled') 
                    ? 'bg-zinc-700 font-bold text-orange-50' 
                    : 'font-normal text-orange-50 hover:text-orange-300'
                }`}>
                  <FontAwesomeIcon icon="calendar-check" className="mr-1" />
                  Scheduled Quizzes
                </Link>
                <Link href="/leaders" className={`px-4 py-2 rounded-full text-md transition duration-150 ${
                  isActive('/leaders') 
                    ? 'bg-zinc-700 font-bold text-orange-50' 
                    : 'font-normal text-orange-50 hover:text-orange-300'
                }`}>
                  <FontAwesomeIcon icon="trophy" className="mr-1" />
                  Leaderboard
                </Link>
                <Link href="/profile" className={`px-4 py-2 rounded-full text-md transition duration-150 ${
                  isActive('/profile') 
                    ? 'bg-zinc-700 font-bold text-orange-50' 
                    : 'font-normal text-orange-50 hover:text-orange-300'
                }`}>
                  <FontAwesomeIcon icon="gear" className="mr-1" />
                  Profile
                </Link>
              </div>
            </nav>
            <button 
              id="mobile-menu-button" 
              className="md:hidden text-white p-2 rounded-md hover:bg-zinc-700"
              onClick={toggleMobileMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <nav id="mobile-menu" className={`md:hidden bg-zinc-800 px-4 pb-3 space-y-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium transition duration-150 ${
          isActive('/') 
            ? 'bg-zinc-700 text-orange-50' 
            : 'text-orange-50 hover:bg-zinc-700'
        }`}>
          <FontAwesomeIcon icon="house" className="w-4 mr-2" />
          Home
        </Link>
        <Link href="/quizvault" className={`block px-3 py-2 rounded-md text-base font-medium transition duration-150 ${
          isActive('/quizvault') 
            ? 'bg-zinc-700 text-orange-50' 
            : 'text-orange-50 hover:bg-zinc-700'
        }`}>
          <FontAwesomeIcon icon="clock-rotate-left" className="w-4 mr-2" />
          Past Quizzes
        </Link>
        <Link href="/scheduled" className={`block px-3 py-2 rounded-md text-base font-medium transition duration-150 ${
          isActive('/scheduled') 
            ? 'bg-zinc-700 text-orange-50' 
            : 'text-orange-50 hover:bg-zinc-700'
        }`}>
          <FontAwesomeIcon icon="calendar-check" className="w-4 mr-2" />
          Scheduled Quizzes
        </Link>
        <Link href="/leaders" className={`block px-3 py-2 rounded-md text-base font-medium transition duration-150 ${
          isActive('/leaders') 
            ? 'bg-zinc-700 text-orange-50' 
            : 'text-orange-50 hover:bg-zinc-700'
        }`}>
          <FontAwesomeIcon icon="trophy" className="w-4 mr-2" />
          Leaderboard
        </Link>
        <Link href="/profile" className={`block px-3 py-2 rounded-md text-base font-medium transition duration-150 ${
          isActive('/profile') 
            ? 'bg-zinc-700 text-orange-50' 
            : 'text-orange-50 hover:bg-zinc-700'
        }`}>
          <FontAwesomeIcon icon="gear" className="w-4 mr-2" />
          Profile
        </Link>
      </nav>
    </>
  );
}
