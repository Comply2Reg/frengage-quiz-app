'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import '@/lib/fontawesome';

export default function Leaders() {
  const [isAnimationRunning, setIsAnimationRunning] = useState(true);

  const toggleAnimation = () => {
    setIsAnimationRunning(!isAnimationRunning);
  };

  useEffect(() => {
    // This would contain the radar chart logic
    // For now, we'll just show the structure
  }, []);

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-neutral-800 shadow-2xl">
        <div className="Leaderboard w-full max-w-sm md:max-w-7xl mx-auto overflow-hidden min-h-[852px]">
          <br />
          <div className="w-full max-w-sm md:max-w-4xl mx-auto px-4 md:px-8">
            <div className="p-5 bg-indigo-500 rounded-2xl shadow-xl flex flex-col items-center">
              <h2 className="text-white text-xl font-bold leading-tight mb-1">Leaders</h2>
              <p className="text-white text-xs font-normal leading-tight opacity-80 mb-6 text-center">
                Meet the people who are on top of the competition, the quizzards of Frengage
              </p>
              <div className="flex w-full max-w-sm justify-center items-end h-52 space-x-2 md:space-x-4">
                <div className="podium-block w-20 h-40 bg-indigo-900/90 pb-3 relative">
                  <div className="absolute top-[0.5rem] flex flex-col items-center">
                    <div className="relative">
                      <Image 
                        className="w-16 h-16 rounded-full border-2 border-white" 
                        src="/images/avatar.png" 
                        alt="2nd Place Avatar"
                        width={64}
                        height={64}
                      />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-5 h-5 bg-neutral-400 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-900/90">
                        2
                      </div>
                    </div>
                  </div>
                  <h3 className="text-white text-xs font-bold mb-2">Norris</h3>
                  <p className="text-white text-xl font-normal">1864</p>
                </div>
                <div className="podium-block w-20 h-44 bg-indigo-700 pb-3 relative">
                  <div className="absolute top-[0.125rem] flex flex-col items-center">
                    <div className="relative">
                      <Image 
                        className="w-16 h-16 rounded-full border-2 border-white" 
                        src="/images/avatar.png" 
                        alt="1st Place Avatar"
                        width={64}
                        height={64}
                      />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-5 h-5 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-700">
                        1
                      </div>
                    </div>
                  </div>
                  <h3 className="text-white text-xs font-bold mb-2">Ronald</h3>
                  <p className="text-white text-xl font-normal">1944</p>
                </div>
                <div className="podium-block w-20 h-40 bg-indigo-900/90 pb-3 relative">
                  <div className="absolute top-[0.5rem] flex flex-col items-center">
                    <div className="relative">
                      <Image 
                        className="w-16 h-16 rounded-full border-2 border-white" 
                        src="/images/avatar.png" 
                        alt="3rd Place Avatar"
                        width={64}
                        height={64}
                      />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-5 h-5 bg-amber-800 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-900/90">
                        3
                      </div>
                    </div>
                  </div>
                  <h3 className="text-white text-xs font-bold mb-2">Tony</h3>
                  <p className="text-white text-xl font-normal">1729</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="radar-container rounded-xl shadow-2xl p-6 sm:p-10 text-white mx-auto">
            <header className="mb-8 text-center border-b border-gray-700 pb-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Mastery Compass</h1>
            </header>
            
            <div id="overall-kpi" className="text-center mb-6 p-4 rounded-xl border border-gray-700">
              {/* KPI Content would be injected here */}
            </div>
            
            {/* Animation Toggle Button */}
            <div className="flex justify-center mb-8">
              <button 
                onClick={toggleAnimation}
                className="px-6 py-3 rounded-lg text-white font-semibold transition-colors shadow-md"
              >
                {isAnimationRunning ? 'Stop Animation' : 'Start Animation'}
              </button>
            </div>

            {/* Canvas for the Radar Chart */}
            <div className="flex justify-center mb-8">
              <canvas id="radarCanvas" width="400" height="400"></canvas>
            </div>
            
            {/* Legend / Key */}
            <div className="legend-grid grid sm:grid-cols-4 gap-4 text-xs sm:text-sm p-4 bg-slate-800/50 rounded-lg font-medium">
              <div className="flex items-center space-x-3 sm:col-span-4 border-b border-gray-700 pb-2 mb-2">
                <span className="text-base sm:text-lg font-bold text-white">Legend: Best, Average and You</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white font-semibold">Your Score Line</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white opacity-15 border-white border"></div>
                <span className="text-white opacity-50">Leader Sector</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white opacity-30 border-white border"></div>
                <span className="text-white opacity-70">Average Sector</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white opacity-5 border-white border"></div>
                <span className="text-white opacity-30">Grid Lines</span>
              </div>
              
              <div className="flex items-center space-x-3 sm:col-span-4 border-b border-gray-700 pb-2 mb-2 mt-4">
                <span className="text-base sm:text-lg font-bold text-white">Legend: Your performance</span>
              </div>
              
              <div className="sm:col-span-4 flex flex-wrap justify-left gap-x-6 gap-y-3"> 
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-600/90 flex items-center justify-center text-xs">👑</div>
                  <span className="text-yellow-400">Yay, Category Leader</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600/90 flex items-center justify-center text-xs">🚀</div>
                  <span className="text-green-400">Cool, Above Average</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-red-600/90 flex items-center justify-center text-xs">🎯</div>
                  <span className="text-red-400">You are doing better</span>
                </div>
              </div>
            </div>
          </div>
        </div>	
      </main>
      
      <Footer />
    </div>
  );
}
