'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/lib/fontawesome';

interface QuizFeedbackProps {
  isCorrect: boolean;
  selectedAnswer: string;
  correctAnswer: string;
  points: number;
  currentScore: number;
  currentRank?: number;
  funFact: string;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
}

export default function QuizFeedback({
  isCorrect,
  selectedAnswer,
  correctAnswer,
  points,
  currentScore,
  currentRank,
  funFact,
  questionNumber,
  totalQuestions,
  onNext
}: QuizFeedbackProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-b from-neutral-800 to-zinc-800 p-4 pb-6">
        <div className="flex items-center justify-between text-white mb-4">
          <button className="text-white hover:text-indigo-400 transition-colors w-10 h-10 flex items-center justify-center -ml-2">
            <FontAwesomeIcon icon="arrow-left" className="text-xl" />
          </button>
          
          <h1 className="text-3xl font-bold">Frengage</h1>

          <div className="w-10 h-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="flex space-x-1 h-2">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-sm transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div 
            className="h-full bg-neutral-700 rounded-sm"
            style={{ width: `${100 - progressPercentage}%` }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 md:p-6 pb-20">
        {/* Feedback Card */}
        <div className="relative min-h-[480px] p-6 rounded-2xl shadow-xl flex flex-col justify-between mb-8 text-white overflow-hidden"
             style={{
               background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), 
                           url('https://images.unsplash.com/photo-${1600000000000 + questionNumber}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          
          {/* Feedback Section */}
          <div className={`text-center mt-6 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isCorrect ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <FontAwesomeIcon 
                    icon="check-circle" 
                    className="text-6xl text-green-500 animate-bounce" 
                  />
                </div>
                <h2 className="text-green-400 text-4xl font-bold leading-10 mb-2 animate-pulse">
                  You nailed it!
                </h2>
                <p className="text-green-500 text-lg font-normal leading-tight mb-6">
                  + {points} points
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <FontAwesomeIcon 
                    icon="times-circle" 
                    className="text-6xl text-red-500 animate-bounce" 
                  />
                </div>
                <h2 className="text-orange-50 text-3xl font-medium leading-9 mb-1">
                  Just missed it!
                </h2>
              </>
            )}

            {/* Score Display */}
            <div className="py-4 mx-auto max-w-xs">
              {currentRank ? (
                <div className="flex justify-center space-x-8 my-8 border-y border-white/20 py-4">
                  <div>
                    <p className="text-4xl font-medium">#{currentRank}</p>
                    <p className="opacity-80 text-base font-normal leading-tight">Current Rank</p>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div>
                    <p className="text-4xl font-medium">{currentScore}</p>
                    <p className="opacity-80 text-base font-normal leading-tight">Current Score</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-6xl font-medium">{currentScore}</p>
                  <p className="opacity-80 text-base font-normal leading-tight">Current Score</p>
                </div>
              )}
            </div>
          </div>

          {/* Fun Fact Section */}
          <div className={`text-center mb-4 transition-all duration-1000 delay-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-orange-50 text-2xl font-medium leading-7 mb-2">
              <FontAwesomeIcon icon="lightbulb" className="mr-2 text-yellow-400" />
              Fun Fact
            </h3>
            <p className="text-white text-base font-normal leading-tight tracking-tight px-4 opacity-90">
              {funFact}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-white pt-2">
            <span className="opacity-70 text-xs font-bold">{questionNumber}/{totalQuestions}</span>
            <button 
              onClick={onNext}
              className="opacity-70 hover:opacity-100 transition-opacity flex items-center space-x-1 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <span className="text-sm font-medium">Next</span>
              <FontAwesomeIcon icon="chevron-right" className="text-sm" />
            </button>
          </div>
        </div>

        {/* Answer Options Display */}
        <div className="grid grid-cols-2 gap-4">
          {[selectedAnswer, correctAnswer].map((answer, index) => {
            const isCorrectAnswer = answer === correctAnswer;
            const isSelectedAnswer = answer === selectedAnswer;
            
            return (
              <div
                key={index}
                className={`w-full h-16 rounded-2xl shadow-md outline outline-1 flex items-center justify-center text-white text-base font-medium transition-all duration-500 ${
                  isCorrectAnswer 
                    ? 'bg-green-600 outline-green-400 animate-pulse' 
                    : isSelectedAnswer && !isCorrectAnswer
                    ? 'bg-red-500 outline-red-400'
                    : 'bg-zinc-800 outline-zinc-600 opacity-50'
                }`}
              >
                {answer}
                {isCorrectAnswer && <FontAwesomeIcon icon="check" className="ml-2" />}
                {isSelectedAnswer && !isCorrectAnswer && <FontAwesomeIcon icon="times" className="ml-2" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
