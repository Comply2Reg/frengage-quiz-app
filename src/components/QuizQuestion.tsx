'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/lib/fontawesome';

interface QuizQuestionProps {
  question: {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    points: number;
    timeLimit: number;
  };
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (selectedOption: number, timeSpent: number) => void;
  onNext: () => void;
}

export default function QuizQuestion({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onAnswer, 
  onNext 
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, isAnswered]);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    setShowCorrectAnswer(true);
    
    const timeSpent = question.timeLimit - timeLeft;
    onAnswer(optionIndex, timeSpent);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowCorrectAnswer(false);
    setTimeLeft(question.timeLimit);
    setStartTime(Date.now());
    onNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOptionClass = (index: number) => {
    if (!showCorrectAnswer) {
      return `w-full h-16 bg-zinc-800 rounded-2xl shadow-md outline outline-1 outline-zinc-600 
              flex items-center justify-center text-white text-base font-medium transition-all duration-200 
              hover:bg-indigo-700 hover:outline-indigo-400 cursor-pointer transform hover:scale-105`;
    }
    
    if (index === question.correctAnswer) {
      return `w-full h-16 bg-green-600 rounded-2xl shadow-md outline outline-2 outline-green-400 
              flex items-center justify-center text-white text-base font-medium animate-pulse`;
    }
    
    if (index === selectedOption && index !== question.correctAnswer) {
      return `w-full h-16 bg-red-500 rounded-2xl shadow-md outline outline-2 outline-red-400 
              flex items-center justify-center text-white text-base font-medium`;
    }
    
    return `w-full h-16 bg-zinc-800 rounded-2xl shadow-md outline outline-1 outline-zinc-600 
            flex items-center justify-center text-white text-base font-medium opacity-50`;
  };

  const progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-b from-neutral-800 to-zinc-800 p-4 pb-6">
        <div className="flex items-center justify-between text-white mb-4">
          <button className="text-white hover:text-indigo-400 transition-colors w-10 h-10 flex items-center justify-center -ml-2">
            <FontAwesomeIcon icon="arrow-left" className="text-xl" />
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold">Frengage</h1>
            <p className="text-sm text-gray-300">{question.category}</p>
          </div>

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
        {/* Question Card */}
        <div className="relative h-96 p-6 rounded-2xl shadow-xl flex flex-col justify-between mb-8 overflow-hidden"
             style={{
               background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), 
                           url('https://images.unsplash.com/photo-${1500000000000 + question.id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          
          {/* Difficulty Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </div>

          {/* Timer */}
          <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-sm font-bold text-white">
            <FontAwesomeIcon icon="clock" className="mr-1" />
            {timeLeft}s
          </div>

          {/* Question Text */}
          <div className="mt-16">
            <p className="text-orange-50 text-2xl font-medium leading-7 mb-4">
              {question.text}
            </p>
            
            {/* Points */}
            <div className="flex items-center text-yellow-400 text-sm">
              <FontAwesomeIcon icon="star" className="mr-1" />
              <span className="font-bold">+{question.points} points</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-white">
            <span className="opacity-70 text-xs font-bold">{currentQuestion}/{totalQuestions}</span>
            {isAnswered && (
              <button 
                onClick={handleNext}
                className="opacity-70 hover:opacity-100 transition-opacity flex items-center space-x-1 bg-indigo-600 px-4 py-2 rounded-lg"
              >
                <span className="text-sm font-medium">Next</span>
                <FontAwesomeIcon icon="chevron-right" className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={getOptionClass(index)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Time's Up Message */}
        {timeLeft === 0 && !isAnswered && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-800 rounded-2xl p-6 text-center max-w-sm">
              <FontAwesomeIcon icon="clock" className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Time's Up!</h3>
              <p className="text-gray-300 mb-4">You didn't answer in time.</p>
              <button 
                onClick={handleNext}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
