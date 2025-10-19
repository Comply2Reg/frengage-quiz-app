'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import '@/lib/fontawesome';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  category: string;
  difficulty: string;
  timeSpent: number;
  rank: number;
  totalPlayers: number;
  streak: number;
  onPlayAgain: () => void;
  onViewScheduled: () => void;
  onViewPast: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  correctAnswers,
  category,
  difficulty,
  timeSpent,
  rank,
  totalPlayers,
  streak,
  onPlayAgain,
  onViewScheduled,
  onViewPast
}: QuizResultsProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStreak, setShowStreak] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    setTimeout(() => setShowStreak(true), 1000);
  }, []);

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const performance = percentage >= 90 ? 'Excellent' : percentage >= 70 ? 'Good' : percentage >= 50 ? 'Fair' : 'Needs Improvement';
  
  const getPerformanceColor = () => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-blue-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "You're better than 95% of the players";
    if (percentage >= 70) return "You're better than 80% of the players";
    if (percentage >= 50) return "You're better than 60% of the players";
    return "Keep practicing to improve!";
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-indigo-400 p-4 pb-12 rounded-t-xl">
        <div className="flex items-center justify-between text-white mb-4">
          <button className="text-white hover:text-indigo-600 transition-colors w-10 h-10 flex items-center justify-center -ml-2">
            <FontAwesomeIcon icon="arrow-left" className="text-xl" />
          </button>
          
          <h1 className="text-white text-3xl font-bold">Frengage</h1>

          <div className="w-10 h-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 md:p-6 -mt-10">
        {/* Results Card */}
        <div className={`bg-zinc-800 rounded-2xl shadow-xl outline outline-1 outline-zinc-600 mb-8 overflow-hidden transition-all duration-1000 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Result Message */}
          <div className="p-6 text-center border-b border-zinc-700/50">
            <p className={`text-2xl font-medium mb-1 leading-7 ${getPerformanceColor()}`}>
              {getPerformanceMessage()}
            </p>
            <p className="text-white opacity-80 text-base font-normal">
              {category}: {difficulty}
            </p>
          </div>

          {/* Streak Section */}
          <div className="p-6">
            <p className="text-center text-white text-base font-normal mb-4">Days streak</p>
            
            {/* Day Labels */}
            <div className="flex justify-between w-full max-w-xs mx-auto text-white opacity-50 text-sm mb-8 font-['Helvetica_Neue']">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <span key={index}>{day}</span>
              ))}
            </div>
            
            {/* Streak Visualization */}
            <div className="relative flex justify-between w-full max-w-xs mx-auto h-12">
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-neutral-500 transform -translate-y-1/2"></div>
              
              <div className="flex justify-between w-full relative z-10 items-center">
                {Array.from({ length: 7 }, (_, index) => {
                  const isStreakDay = index < streak;
                  const isCurrentDay = index === streak - 1;
                  
                  return (
                    <div key={index} className="relative">
                      {isCurrentDay ? (
                        <div className="w-14 h-14 -mt-4 flex items-center justify-center">
                          <div className="w-full h-full rounded-full border-2 border-indigo-400 flex items-center justify-center bg-white">
                            <div className={`absolute w-10 h-10 rounded-full -top-2 bg-white flex items-center justify-center transition-all duration-1000 ${
                              showStreak ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`} style={{
                              background: 'linear-gradient(to bottom right, #FF9800, #F44336)',
                              boxShadow: '0 0 15px rgba(255, 109, 0, 0.5)'
                            }}>
                              <FontAwesomeIcon icon="fire" className="text-lg text-white" />
                            </div>
                            <span className="text-zinc-800 text-4xl font-bold leading-none z-10">
                              {streak}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          isStreakDay 
                            ? 'bg-white border-indigo-400' 
                            : 'bg-neutral-500 border-neutral-500'
                        }`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-2 gap-4 text-center text-white py-6 border-y border-zinc-700/50">
            <div>
              <p className="text-4xl font-medium mb-1">{correctAnswers}/{totalQuestions}</p>
              <p className="text-base font-normal opacity-80 leading-tight">Correct Answers</p>
            </div>
            <div>
              <p className="text-4xl font-medium mb-1">{score}</p>
              <p className="text-base font-normal opacity-80 leading-tight">Total Score</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-3 gap-4 text-center text-white py-4 border-b border-zinc-700/50">
            <div>
              <p className="text-2xl font-medium mb-1">#{rank}</p>
              <p className="text-sm font-normal opacity-80">Rank</p>
            </div>
            <div>
              <p className="text-2xl font-medium mb-1">{Math.round(timeSpent / 60)}m</p>
              <p className="text-sm font-normal opacity-80">Time</p>
            </div>
            <div>
              <p className="text-2xl font-medium mb-1">{percentage}%</p>
              <p className="text-sm font-normal opacity-80">Accuracy</p>
            </div>
          </div>

          {/* Up Next Section */}
          <div className="bg-black/60 p-4 rounded-b-2xl">
            <div className="text-center">
              <p className="text-white text-base font-normal opacity-80 mb-2">Up next:</p>
              <p className="text-orange-50 text-2xl font-medium mb-4 leading-7">
                {category}: {difficulty}
              </p>
              
              <button 
                onClick={onPlayAgain}
                className="w-32 h-9 bg-white hover:bg-zinc-200 transition-colors rounded-lg shadow-md flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-black text-base font-normal leading-tight">Take the quiz</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className={`flex flex-col space-y-4 pt-4 transition-all duration-1000 delay-500 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-center text-white text-base font-normal opacity-80">or</p>
          
          <button 
            onClick={onViewScheduled}
            className="w-full h-12 bg-indigo-400 hover:bg-indigo-500 transition-colors rounded-2xl shadow-lg
                      flex items-center justify-center text-white text-base font-medium tracking-tight"
          >
            <FontAwesomeIcon icon="calendar-check" className="mr-2" />
            View Scheduled Quizzes
          </button>

          <button 
            onClick={onViewPast}
            className="w-full h-12 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-2xl shadow-lg outline outline-2 outline-indigo-400 
                      flex items-center justify-center text-white text-base font-medium tracking-tight"
          >
            <FontAwesomeIcon icon="clock-rotate-left" className="mr-2" />
            View Past Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}
