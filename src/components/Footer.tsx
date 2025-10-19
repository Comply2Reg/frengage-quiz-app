import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-indigo-400 py-20 mt-16 text-neutral-900 rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image width={50} height={50} src="/images/logo-round.png" alt="Frengage Logo" />
            <span className="text-2xl font-extrabold">Frengage</span>
          </div>
          <p className="text-sm text-neutral-800">
            The daily destination for trivia enthusiasts. We turn current events, pop culture, and complex topics into fun, competitive quizzes designed to engage your mind.
          </p>
          <p className="text-xs text-neutral-700 pt-4">
            &copy; 2024 Frengage, Inc. All rights reserved.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b border-neutral-700/50 pb-2">Quizzes</h3>
          <nav className="space-y-2 text-sm">
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="calendar-day" className="w-4 mr-2" />
              Today&apos;s Spotlight
            </Link>
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="clock-rotate-left" className="w-4 mr-2" />
              Quiz Vault (Past Quizzes)
            </Link>
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="calendar-check" className="w-4 mr-2" />
              Scheduled Live Events
            </Link>
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="trophy" className="w-4 mr-2" />
              Global Leaderboard
            </Link>
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="users" className="w-4 mr-2" />
              Live Arena
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b border-neutral-700/50 pb-2">Company</h3>
          <nav className="space-y-2 text-sm">
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="briefcase" className="w-4 mr-2" />
              Organizations/Enterprise
            </Link>
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="circle-info" className="w-4 mr-2" />
              About Us
            </Link>
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="scale-balanced" className="w-4 mr-2" />
              Terms & Privacy
            </Link>
            <Link href="#" className="block hover:underline">
              <FontAwesomeIcon icon="clipboard-list" className="w-4 mr-2" />
              Cookie Policy
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b border-neutral-700/50 pb-2">Connect</h3>
          <p className="text-sm text-neutral-800">Have questions? Get in touch!</p>
          <p className="text-sm">
            <FontAwesomeIcon icon="envelope" className="w-4 mr-2" />
            support@frengage.com
          </p>
          <div className="flex space-x-4 pt-2">
            <Link href="#" aria-label="Follow us on Twitter" className="text-2xl hover:text-white transition duration-150">
              <FontAwesomeIcon icon={['fab', 'x-twitter']} />
            </Link>
            <Link href="#" aria-label="Follow us on Facebook" className="text-2xl hover:text-white transition duration-150">
              <FontAwesomeIcon icon={['fab', 'facebook']} />
            </Link>
            <Link href="#" aria-label="Follow us on LinkedIn" className="text-2xl hover:text-white transition duration-150">
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
            </Link>
            <Link href="#" aria-label="Subscribe on YouTube" className="text-2xl hover:text-white transition duration-150">
              <FontAwesomeIcon icon={['fab', 'youtube']} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-neutral-700">
        <p><strong>Please note, this site uses cookies.</strong></p>
        <p><strong>Mainly to adminster contests and tracking your performance. </strong></p>
        <p><strong>Clicking on any links may add a cookie. </strong></p>
        <p><strong>Please read cookie policy for details before proceeding.</strong></p>
        <br />
        <p>Frengage is designed for intellectual engagement and fun. Play responsibly!</p>
      </div>
    </footer>
  );
}
