import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';

export default function TodaysQuizzes() {
  return (
    <div className="lg:col-span-1 bg-indigo-500 p-6 rounded-2xl shadow-xl space-y-2 max-w-lg mx-auto lg:max-w-none lg:mx-0">
      <h3 className="text-xl font-bold text-white leading-tight">Today&apos;s Quizzes</h3>
      <p className="text-sm font-normal text-white/90">Your daily dose of quizdom</p>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="bg-indigo-700 rounded-lg p-3 h-48 flex flex-col justify-between shadow-md relative">
          <div className="flex-grow min-h-0 basis-1/2 space-y-1">
            <h4 className="text-base font-bold text-orange-50 leading-tight">Spotlight Quiz</h4>
            <p className="text-xs font-normal text-white/80">Fresh themes for daily thrills</p>
          </div>
          <div className="flex-grow min-h-0 basis-1/2 overflow-hidden rounded-md mt-2">
            <Link href="/themequiz">
              <Image 
                className="w-full h-full object-cover" 
                src="/images/space.jpg" 
                alt="Spotlight Quiz Image"
                width={200}
                height={150}
              />
            </Link>	
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-lime-500 rounded-full border-4 border-indigo-700 flex items-center justify-center shadow-lg">
            <FontAwesomeIcon icon="check" className="text-white text-base" />
          </div>
        </div>
        <div className="bg-indigo-700 rounded-lg p-3 h-48 flex flex-col justify-between shadow-md relative">
          <div className="flex-grow min-h-0 basis-1/2 space-y-1">
            <h4 className="text-base font-bold text-orange-50 leading-tight">In The Now</h4>
            <p className="text-xs font-normal text-white/80">World events turned into fun trivia</p>
          </div>
          <div className="flex-grow min-h-0 basis-1/2 overflow-hidden rounded-md mt-2">
            <Link href="/dailyquiz">
              <Image 
                className="w-full h-full object-cover" 
                src="/images/modiji.jpg" 
                alt="In The Now Quiz Image"
                width={200}
                height={150}
              />
            </Link>		
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full border-4 border-indigo-700 flex items-center justify-center shadow-lg">
            <FontAwesomeIcon icon="bolt" className="text-white text-base" />
          </div>
        </div>
      </div>
    </div>
  );
}
