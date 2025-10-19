'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizQuestion from '@/components/QuizQuestion';
import QuizFeedback from '@/components/QuizFeedback';
import QuizResults from '@/components/QuizResults';
import AdminMonitor from '@/components/AdminMonitor';
import '@/lib/fontawesome';

// Type definitions
interface Quiz {
  id: string;
  title: string;
  theme: string;
  difficulty: string;
  participants: number;
  duration: number;
  prize: string;
  status: 'live' | 'upcoming' | 'ended';
  date: string;
  time: string;
}

interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  timeLimit: number;
  funFact: string;
}

export default function Scheduled() {
  const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 1, minutes: 14, seconds: 30 });
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<'question' | 'feedback' | 'results'>('question');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(Date.now());
  const [lastAnswer, setLastAnswer] = useState<{isCorrect: boolean, selected: number, correct: number, points: number} | null>(null);

  // Quiz data for different themes
  const quizData = {
    'Astronomy & Space': [
      {
        id: 1,
        text: 'Which planet is known as the "Red Planet" and is the fourth planet from the Sun?',
        options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
        correctAnswer: 2,
        category: 'Astronomy & Space',
        difficulty: 'Easy',
        points: 10,
        timeLimit: 20,
        funFact: 'Mars appears red due to iron oxide (rust) on its surface, giving it the nickname "Red Planet".'
      },
      {
        id: 2,
        text: 'What is the name of the first artificial satellite launched into space?',
        options: ['Explorer 1', 'Sputnik 1', 'Vanguard 1', 'Luna 1'],
        correctAnswer: 1,
        category: 'Astronomy & Space',
        difficulty: 'Medium',
        points: 15,
        timeLimit: 25,
        funFact: 'Sputnik 1 was launched by the Soviet Union on October 4, 1957, marking the beginning of the space age.'
      },
      {
        id: 3,
        text: 'Which space telescope was launched in 1990 and has provided stunning images of deep space?',
        options: ['James Webb', 'Hubble', 'Spitzer', 'Chandra'],
        correctAnswer: 1,
        category: 'Astronomy & Space',
        difficulty: 'Medium',
        points: 15,
        timeLimit: 30,
        funFact: 'The Hubble Space Telescope has made over 1.4 million observations and helped determine the age of the universe.'
      }
    ],
    'Technology & AI': [
      {
        id: 4,
        text: 'What does "AI" stand for in the context of computer science?',
        options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Integration', 'Algorithmic Intelligence'],
        correctAnswer: 1,
        category: 'Technology & AI',
        difficulty: 'Easy',
        points: 10,
        timeLimit: 20,
        funFact: 'The term "Artificial Intelligence" was first coined by John McCarthy in 1956 at the Dartmouth Conference.'
      },
      {
        id: 5,
        text: 'Which company developed the GPT (Generative Pre-trained Transformer) language models?',
        options: ['Google', 'OpenAI', 'Microsoft', 'Facebook'],
        correctAnswer: 1,
        category: 'Technology & AI',
        difficulty: 'Medium',
        points: 15,
        timeLimit: 25,
        funFact: 'GPT models use transformer architecture and have revolutionized natural language processing with their ability to generate human-like text.'
      }
    ],
    'World History': [
      {
        id: 6,
        text: 'In which year did World War II end?',
        options: ['1944', '1945', '1946', '1947'],
        correctAnswer: 1,
        category: 'World History',
        difficulty: 'Easy',
        points: 10,
        timeLimit: 20,
        funFact: 'World War II ended on September 2, 1945, with the formal surrender of Japan aboard the USS Missouri.'
      },
      {
        id: 7,
        text: 'Who was the first person to walk on the Moon?',
        options: ['Buzz Aldrin', 'Neil Armstrong', 'John Glenn', 'Alan Shepard'],
        correctAnswer: 1,
        category: 'World History',
        difficulty: 'Easy',
        points: 10,
        timeLimit: 25,
        funFact: 'Neil Armstrong\'s famous words "That\'s one small step for man, one giant leap for mankind" were heard by over 600 million people worldwide.'
      }
    ],
    'Sports & Athletics': [
      {
        id: 8,
        text: 'In which sport would you perform a "slam dunk"?',
        options: ['Tennis', 'Basketball', 'Volleyball', 'Badminton'],
        correctAnswer: 1,
        category: 'Sports & Athletics',
        difficulty: 'Easy',
        points: 10,
        timeLimit: 20,
        funFact: 'The slam dunk was popularized by players like Julius Erving and Michael Jordan, becoming one of basketball\'s most exciting plays.'
      },
      {
        id: 9,
        text: 'Which country has won the most FIFA World Cup titles?',
        options: ['Germany', 'Argentina', 'Brazil', 'Italy'],
        correctAnswer: 2,
        category: 'Sports & Athletics',
        difficulty: 'Medium',
        points: 15,
        timeLimit: 25,
        funFact: 'Brazil has won 5 FIFA World Cups (1958, 1962, 1970, 1994, 2002), more than any other country.'
      }
    ],
    'Entertainment': [
      {
        id: 10,
        text: 'Which movie won the Academy Award for Best Picture in 2020?',
        options: ['Joker', 'Parasite', '1917', 'Once Upon a Time in Hollywood'],
        correctAnswer: 1,
        category: 'Entertainment',
        difficulty: 'Medium',
        points: 15,
        timeLimit: 25,
        funFact: 'Parasite became the first non-English language film to win the Academy Award for Best Picture.'
      },
      {
        id: 11,
        text: 'Who is known as the "King of Pop"?',
        options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Madonna'],
        correctAnswer: 1,
        category: 'Entertainment',
        difficulty: 'Easy',
        points: 10,
        timeLimit: 20,
        funFact: 'Michael Jackson\'s album "Thriller" is the best-selling album of all time, with over 66 million copies sold worldwide.'
      }
    ]
  };

  const quizCards = [
    { 
      id: '1',
      bgColor: 'bg-gradient-to-br from-indigo-500 to-indigo-700', 
      title: 'Space Exploration Mastery', 
      theme: 'Astronomy & Space', 
      date: '08/10', 
      time: '12:20PM',
      participants: 1247,
      difficulty: 'Hard',
      prize: '₹5,000',
      status: 'live' as const,
      duration: 30
    },
    { 
      id: '2',
      bgColor: 'bg-gradient-to-br from-slate-500 to-slate-700', 
      title: 'Tech Innovation Challenge', 
      theme: 'Technology & AI', 
      date: '08/10', 
      time: '2:30PM',
      participants: 892,
      difficulty: 'Medium',
      prize: '₹3,000',
      status: 'upcoming' as const,
      duration: 25
    },
    { 
      id: '3',
      bgColor: 'bg-gradient-to-br from-purple-600 to-purple-900', 
      title: 'History Buffs Unite', 
      theme: 'World History', 
      date: '08/10', 
      time: '4:45PM',
      participants: 2156,
      difficulty: 'Easy',
      prize: '₹2,500',
      status: 'upcoming' as const,
      duration: 20
    },
    { 
      id: '4',
      bgColor: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-700', 
      title: 'Sports Legends Quiz', 
      theme: 'Sports & Athletics', 
      date: '08/10', 
      time: '6:15PM',
      participants: 1834,
      difficulty: 'Medium',
      prize: '₹4,000',
      status: 'upcoming' as const,
      duration: 35
    },
    { 
      id: '5',
      bgColor: 'bg-gradient-to-br from-pink-500 to-pink-700', 
      title: 'Pop Culture Frenzy', 
      theme: 'Entertainment', 
      date: '08/10', 
      time: '8:00PM',
      participants: 3456,
      difficulty: 'Easy',
      prize: '₹1,500',
      status: 'upcoming' as const,
      duration: '15 min'
    },
    { 
      id: 6,
      bgColor: 'bg-gradient-to-br from-red-400 to-red-600', 
      title: 'Science & Nature', 
      theme: 'Biology & Chemistry', 
      date: '08/10', 
      time: '9:30PM',
      participants: 987,
      difficulty: 'Hard',
      prize: '₹6,000',
      status: 'upcoming' as const,
      duration: '40 min'
    },
    { 
      id: 7,
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600', 
      title: 'Current Affairs Champion', 
      theme: 'News & Politics', 
      date: '08/10', 
      time: '11:00PM',
      participants: 2789,
      difficulty: 'Medium',
      prize: '₹3,500',
      status: 'upcoming' as const,
      duration: 25
    },
    { 
      id: 8,
      bgColor: 'bg-gradient-to-br from-fuchsia-600 to-fuchsia-800', 
      title: 'Math Wizards Challenge', 
      theme: 'Mathematics', 
      date: '09/10', 
      time: '10:00AM',
      participants: 1456,
      difficulty: 'Hard',
      prize: '₹7,500',
      status: 'upcoming' as const,
      duration: '45 min'
    },
  ];

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const openWaitingModal = (quizTitle: string) => {
    setSelectedQuiz(quizTitle);
    setIsWaitingModalOpen(true);
  };

  const closeWaitingModal = () => {
    setIsWaitingModalOpen(false);
    setSelectedQuiz(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Quiz functions
  const startQuiz = (quiz: Quiz) => {
    console.log('Starting quiz:', quiz);
    const questions = quizData[quiz.theme as keyof typeof quizData] || [];
    console.log('Questions found:', questions);
    
    if (questions.length === 0) {
      console.log('No questions found for theme:', quiz.theme);
      return;
    }
    
    setCurrentQuiz(quiz);
    setQuizQuestions(questions as QuizQuestion[]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTotalScore(0);
    setQuizStartTime(Date.now());
    setQuizState('question');
    setIsQuizActive(true);
    
    console.log('Quiz state set to active');
    
    // Notify admin that quiz started
    notifyAdmin('quiz_started', { quizId: quiz.id, quizTitle: quiz.title, theme: quiz.theme });
  };

  const handleQuizAnswer = (selectedOption: number, timeSpent: number) => {
    if (!quizQuestions[currentQuestionIndex]) return;

    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === question.correctAnswer;
    const points = isCorrect ? Math.max(1, question.points - Math.floor(timeSpent / 5)) : 0;
    
    setUserAnswers(prev => [...prev, selectedOption]);
    setTotalScore(prev => prev + points);
    
    setLastAnswer({
      selected: selectedOption,
      correct: question.correctAnswer,
      isCorrect,
      points
    });

    setQuizState('feedback');
    
    // Notify admin of answer
    if (currentQuiz) {
      notifyAdmin('answer_submitted', { 
        quizId: currentQuiz.id, 
        questionId: question.id, 
        selectedOption, 
        isCorrect, 
        points 
      });
    }
  };

  const handleQuizNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizState('question');
    } else {
      setQuizState('results');
      // Notify admin of quiz completion
      if (currentQuiz) {
        notifyAdmin('quiz_completed', { 
          quizId: currentQuiz.id, 
          totalScore, 
          correctAnswers: userAnswers.filter((answer, index) => 
            answer === quizQuestions[index].correctAnswer
          ).length,
          totalQuestions: quizQuestions.length
        });
      }
    }
  };

  const handleQuizPlayAgain = () => {
    if (currentQuiz) {
      startQuiz(currentQuiz);
    }
  };

  const handleQuizExit = () => {
    setIsQuizActive(false);
    setCurrentQuiz(null);
    setQuizState('question');
    setCurrentQuestionIndex(0);
    setQuizQuestions([]);
    setUserAnswers([]);
    setTotalScore(0);
    setLastAnswer(null);
  };

  const handleViewScheduled = () => {
    handleQuizExit();
  };

  const handleViewPast = () => {
    handleQuizExit();
    window.location.href = '/quizvault';
  };

  // Admin notification function (placeholder for real implementation)
  const notifyAdmin = (event: string, data: Record<string, unknown>) => {
    // This would send real-time updates to admin dashboard
    console.log('Admin Notification:', event, data);
    
    // Dispatch custom event for admin monitor
    const adminEvent = new CustomEvent('adminEvent', {
      detail: { event, data }
    });
    window.dispatchEvent(adminEvent);
    
    // In real implementation, this would use WebSocket or similar
  };

  // Render quiz if active
  console.log('Render check - isQuizActive:', isQuizActive, 'currentQuiz:', currentQuiz, 'quizState:', quizState);
  
  if (isQuizActive && currentQuiz) {
    console.log('Quiz is active, rendering quiz component');
    if (quizState === 'question' && quizQuestions[currentQuestionIndex]) {
      console.log('Rendering question:', quizQuestions[currentQuestionIndex]);
      return (
        <QuizQuestion
          question={quizQuestions[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          onAnswer={handleQuizAnswer}
          onNext={handleQuizNext}
        />
      );
    }

    if (quizState === 'feedback' && lastAnswer) {
      return (
        <QuizFeedback
          isCorrect={lastAnswer.isCorrect}
          selectedAnswer={quizQuestions[currentQuestionIndex].options[lastAnswer.selected]}
          correctAnswer={quizQuestions[currentQuestionIndex].options[lastAnswer.correct]}
          points={lastAnswer.points}
          currentScore={totalScore}
          currentRank={Math.max(1, Math.floor(Math.random() * 100) + 1)}
          funFact={quizQuestions[currentQuestionIndex].funFact}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          onNext={handleQuizNext}
        />
      );
    }

    if (quizState === 'results') {
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === quizQuestions[index].correctAnswer
      ).length;
      
      const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
      const rank = Math.max(1, Math.floor(Math.random() * 1000) + 1);
      const streak = Math.floor(Math.random() * 7) + 1;

      return (
        <QuizResults
          score={totalScore}
          totalQuestions={quizQuestions.length}
          correctAnswers={correctAnswers}
          category={currentQuiz.theme}
          difficulty={currentQuiz.difficulty}
          timeSpent={timeSpent}
          rank={rank}
          streak={streak}
          onPlayAgain={handleQuizPlayAgain}
          onViewScheduled={handleViewScheduled}
          onViewPast={handleViewPast}
        />
      );
    }
  }

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
            Live Quiz Arena
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of players in real-time competitive quizzes. Test your knowledge, win prizes, and climb the leaderboard!
          </p>
          
          {/* Debug Test Button */}
          <div className="mt-8">
            <button 
              onClick={() => {
                console.log('Test button clicked');
                const testQuiz: Quiz = {
                  id: '999',
                  title: 'Test Quiz',
                  theme: 'Astronomy & Space',
                  difficulty: 'Easy',
                  participants: 100,
                  duration: 10,
                  prize: '₹500',
                  status: 'live' as const,
                  date: 'Today',
                  time: 'Now'
                };
                startQuiz(testQuiz);
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              🧪 Test Quiz (Debug)
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-3xl font-bold text-white">2,847</div>
            <div className="text-indigo-200 text-sm">Active Players</div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-3xl font-bold text-white">₹50K+</div>
            <div className="text-green-200 text-sm">Total Prizes</div>
          </div>
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-3xl font-bold text-white">156</div>
            <div className="text-orange-200 text-sm">Quizzes Today</div>
          </div>
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-3xl font-bold text-white">98%</div>
            <div className="text-pink-200 text-sm">Satisfaction</div>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="p-4 md:p-6 pb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon="calendar-check" className="mr-3 text-indigo-400" />
              Scheduled Quizzes
            </h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors text-sm font-medium">
                <FontAwesomeIcon icon="filter" className="mr-2" />
                Filter
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-sm font-medium">
                <FontAwesomeIcon icon="trophy" className="mr-2" />
                My Quizzes
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {quizCards.map((quiz, index) => (
              <div 
                key={quiz.id} 
                className={`quiz-card ${quiz.bgColor} rounded-2xl p-6 flex flex-col justify-between min-h-[300px] shadow-xl hover:shadow-2xl transform hover:scale-102 transition-all duration-300 cursor-pointer group relative overflow-hidden border border-white/10`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Status Badge - Removed as it doesn't symbolize anything meaningful */}
                
                {/* Difficulty Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </div>

                {/* Prize Badge - Moved to top right corner */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  🏆 {quiz.prize}
                </div>

                <div className="mt-6 pr-16">
                  <h3 className="text-white text-lg font-bold leading-tight mb-3 group-hover:text-yellow-200 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-white/80 text-sm font-medium mb-4">
                    {quiz.theme}
                  </p>
                  
                  {/* Info Grid - Column aligned */}
                  <div className="grid grid-cols-2 gap-4 text-white/90 text-xs mb-2">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon="users" className="mr-1.5 text-blue-300 w-3 h-3" />
                      <span className="font-medium">{quiz.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon="clock" className="mr-1.5 text-green-300 w-3 h-3" />
                      <span className="font-medium">{quiz.duration} min</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  {/* Date and Time - Column aligned */}
                  <div className="grid grid-cols-2 gap-4 text-white/80 text-xs mb-3">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon="calendar-alt" className="mr-1.5 text-indigo-300 w-3 h-3" />
                      <span className="font-medium">{quiz.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon="clock" className="mr-1.5 text-green-300 w-3 h-3" />
                      <span className="font-medium">{quiz.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 items-center">
                    <button className="enroll-btn bg-white/90 text-neutral-700 text-sm font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-white hover:scale-105 transition-all duration-200 flex-1 h-9 flex items-center justify-center">
                      <FontAwesomeIcon icon="user-plus" className="mr-1 w-3 h-3" />
                      Enroll
                    </button>
                    <button 
                      onClick={() => {
                        console.log('Button clicked for quiz:', quiz);
                        if (quiz.status === 'live') {
                          console.log('Starting live quiz...');
                          startQuiz(quiz);
                        } else {
                          console.log('Opening waiting modal...');
                          openWaitingModal(quiz.title);
                        }
                      }}
                      className="play-btn bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold px-3 py-2 rounded-lg shadow-md hover:from-orange-600 hover:to-pink-600 hover:scale-105 transition-all duration-200 flex-1 h-9 flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon="play" className="mr-1 w-3 h-3" />
                      {quiz.status === 'live' ? 'Join' : 'Play'}
                    </button>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Waiting Modal */}
        <div className={`${isWaitingModalOpen ? 'flex' : 'hidden'} fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-all duration-300`}>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl border border-zinc-600 p-8 text-center shadow-2xl transform scale-100 transition-all duration-300">
              {/* Close Button */}
              <button 
                onClick={closeWaitingModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon="xmark" className="text-xl" />
              </button>

              {/* Quiz Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <FontAwesomeIcon icon="play" className="text-3xl text-white" />
              </div>

              <h3 className="text-orange-50 text-3xl font-bold mb-2">Waiting to Start</h3>
              <p className="text-white text-lg font-normal opacity-90 mb-8">
                <span className="font-bold text-yellow-400">{selectedQuiz}</span> will start in
              </p>
              
              {/* Enhanced Timer */}
              <div className="flex justify-center space-x-3 md:space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex flex-col items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-200">
                  <span className="text-white text-3xl font-bold" id="timer-days">{timeLeft.days.toString().padStart(2, '0')}</span>
                  <span className="text-indigo-200 text-xs font-medium">Days</span>
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex flex-col items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-200">
                  <span className="text-white text-3xl font-bold" id="timer-hours">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-green-200 text-xs font-medium">Hours</span>
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex flex-col items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-200">
                  <span className="text-white text-3xl font-bold" id="timer-minutes">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-orange-200 text-xs font-medium">Minutes</span>
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl flex flex-col items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-200">
                  <span className="text-white text-3xl font-bold" id="timer-seconds">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-pink-200 text-xs font-medium">Seconds</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>

              <p className="text-white text-lg font-normal opacity-90 mb-6">
                🎯 <span className="font-bold">1,247 players</span> are waiting with you!
              </p>
              
              <div className="flex space-x-4">
                <button 
                  onClick={closeWaitingModal}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-200 font-bold transform hover:scale-105">
                  <FontAwesomeIcon icon="bell" className="mr-2" />
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AdminMonitor />
    </div>
  );
}