import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TodaysQuizzes from '@/components/TodaysQuizzes';
import TodaysTheme from '@/components/TodaysTheme';
import '@/lib/fontawesome';

export default function Home() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-neutral-800 shadow-2xl">
        <section className="grid lg:grid-cols-3 gap-8 pt-10 pb-16">
          <div className="lg:col-span-2 text-center lg:text-left space-y-8">
            <h1 className="text-7xl sm:text-8xl font-extrabold text-orange-50 leading-tight">Frengage</h1>
            <p className="max-w-3xl mx-auto lg:mx-0 text-xl font-light text-orange-50/90 leading-relaxed tracking-wide">
              From current affairs and pop culture to clever clues and wordplay, every quiz and format is designed to make thinking fun. Play solo or compete with friends & other players.
            </p>
            <p className="max-w-3xl mx-auto lg:mx-0 text-xl font-light text-orange-50/90 leading-relaxed tracking-wide mt-4">
              Hover over the cards to see which categories of quizzes to expect or click below to jump right in to a past themed quiz.
            </p>
          </div>
          <TodaysQuizzes />
        </section>
        
        <section className="grid md:grid-cols-2 gap-12 border-b border-white/10 pb-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              <FontAwesomeIcon icon="users" className="text-indigo-400 mr-2" />
              Live Quiz Arena
            </h2>
            <p className="text-white/80 text-base">Play live quizzes in thrilling formats, compete in real time, and watch your trivia stats grow.</p>
            <div className="flex space-x-4 pt-2">
              <Link href="/scheduled">
                <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-full text-orange-50 text-base font-bold transition duration-150 shadow-lg">
                  <FontAwesomeIcon icon="crosshairs" className="mr-2" />
                  Enter Now
                </button>
              </Link>	
              <button className="px-6 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-white rounded-full text-orange-50 text-base font-bold transition duration-150">
                <FontAwesomeIcon icon="right-to-bracket" className="mr-2" />
                Signup/Login
              </button>
            </div>
          </div>
          <div className="space-y-4 md:border-l md:border-white/10 md:pl-8">
            <h2 className="text-4xl font-extrabold text-orange-50">
              <FontAwesomeIcon icon="trophy" className="mr-2" />
              Leaderboard
            </h2>
            <p className="text-white/80 text-base">Inspiration for your next win. View live rankings, compare your stats, and keep climbing the ladder.</p>
            <div className="pt-2">
              <Link href="/leaders">
                <button className="px-6 py-2 bg-purple-800 hover:bg-purple-900 rounded-full text-orange-50 text-base font-bold transition duration-150 shadow-lg">
                  <FontAwesomeIcon icon="arrow-up-right-from-square" className="mr-2" />
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </section>
        
        <TodaysTheme />

        <section className="grid md:grid-cols-2 gap-12 py-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-orange-50 leading-10">
              <FontAwesomeIcon icon="box-archive" className="text-indigo-400 mr-2" />
              Quiz Vault
            </h2>
            <p className="text-white/80 text-base">Dive into previous quizzes across categories. Test yourself again or learn what you missed.</p>
            <div className="pt-2">
              <Link href="/quizvault">
                <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 border border-white rounded-full text-orange-50 text-base font-bold transition duration-150 shadow-lg">
                  <FontAwesomeIcon icon="magnifying-glass" className="mr-2" />
                  Browse
                </button>
              </Link>	
            </div>
          </div>
          <div className="space-y-4 md:border-l md:border-white/10 md:pl-8">
            <h2 className="text-4xl font-extrabold text-orange-50 leading-10">
              <FontAwesomeIcon icon="building" className="text-orange-400 mr-2" />
              Frengage for Organizations
            </h2>
            <p className="text-white/80 text-base">Play. Challenge. Unite. Run trivia contests that connect, challenge, and engage your students, employees, and members.</p>
            <div className="pt-2">
              <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 border border-white rounded-full text-orange-50 text-base font-bold transition duration-150 shadow-lg">
                <FontAwesomeIcon icon="handshake-angle" className="mr-2" />
                Contact Us
              </button>
            </div>
          </div>
        </section>	
        
        <section className="py-4 h-[200px] bg-zinc-900/50 rounded-xl border border-white/10 shadow-inner">
          <div id="word-cloud-container" className="relative w-full h-full overflow-hidden flex items-center justify-center">
            <p className="text-white/30 text-lg absolute pointer-events-none">Dynamic Tag Cloud Loading...</p>
        </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
