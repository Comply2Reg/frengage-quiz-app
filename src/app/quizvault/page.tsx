'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/lib/fontawesome';

export default function QuizVault() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('date');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-neutral-800 shadow-2xl">
        <div className="p-4 md:p-6 pb-20">
          <div className="bg-indigo-400 p-4 rounded-2xl shadow-lg mb-8">
            <h2 className="text-white text-xl font-bold leading-tight mb-1">Yesterday&apos;s Quizzes</h2>
            <p className="text-white text-xs font-normal opacity-80 mb-4">Get right into the fun without logging in</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Yesterday's quiz cards would be populated here */}
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-2xl font-bold leading-tight">All past quizzes</h2>
            <button 
              onClick={toggleModal}
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-indigo-500 transition-colors flex items-center space-x-2"
            >
              <FontAwesomeIcon icon="filter" className="fa-sm" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Quiz cards would be populated here */}
          </div>
        </div>

        {/* Filter Modal */}
        <div className={`fixed inset-0 z-50 ${isModalOpen ? 'flex' : 'hidden'} items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300`}>
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 w-full max-w-sm mx-auto shadow-2xl p-6 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-3">
              <h3 className="text-orange-50 text-2xl font-medium">Filter</h3>
              <button 
                onClick={toggleModal}
                className="text-white hover:text-gray-400 p-2 -mr-3"
              >
                <FontAwesomeIcon icon="xmark" className="fa-xl" />
              </button>
            </div>
            
            <div className="flex space-x-2 mb-6 p-1 bg-stone-900 rounded-full">
              <button 
                onClick={() => toggleFilter('date')}
                className={`flex-1 text-white text-sm font-medium py-2 rounded-full transition-colors ${
                  activeFilter === 'date' ? 'bg-indigo-600' : 'hover:bg-stone-700'
                }`}
              >
                Filter by Date
              </button>
              <button 
                onClick={() => toggleFilter('category')}
                className={`flex-1 text-white text-sm font-medium py-2 rounded-full transition-colors ${
                  activeFilter === 'category' ? 'bg-indigo-600' : 'hover:bg-stone-700'
                }`}
              >
                Filter by Category
              </button>
            </div>
            
            {activeFilter === 'category' && (
              <div className="mb-8">
                <label className="block text-white text-base font-normal mb-2">Filter by Category</label>
                <div className="relative">
                  <select className="block w-full bg-stone-900 text-white p-2.5 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <option>All Categories</option>
                    <option>Cricket</option>
                    <option>Sports Beyond Cricket</option>
                    <option>Tech and Gadgets</option>
                    <option>General Knowledge</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <FontAwesomeIcon icon="chevron-down" className="fa-xs" />
                  </div>
                </div>
              </div>
            )}
            
            {activeFilter === 'date' && (
              <div className="space-y-6 mb-8">
                <div>
                  <label htmlFor="quiz-date" className="block text-white text-base font-normal mb-2">Select Quiz Date</label>
                  <input 
                    type="date" 
                    id="quiz-date" 
                    className="w-full bg-stone-900 text-white p-2.5 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent hover:border-zinc-700 transition-colors"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <button 
                onClick={toggleModal}
                className="bg-indigo-400 text-white text-base font-medium px-6 py-2 rounded-full shadow-lg hover:bg-indigo-500 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
