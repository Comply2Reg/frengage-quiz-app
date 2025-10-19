'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/lib/fontawesome';

interface AdminEvent {
  id: string;
  timestamp: Date;
  event: string;
  data: any;
  userId: string;
}

export default function AdminMonitor() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen for admin events (in real implementation, this would be WebSocket)
    const handleAdminEvent = (event: CustomEvent) => {
      const newEvent: AdminEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        event: event.detail.event,
        data: event.detail.data,
        userId: 'user_' + Math.floor(Math.random() * 1000) // Mock user ID
      };
      
      setEvents(prev => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events
    };

    window.addEventListener('adminEvent', handleAdminEvent as EventListener);
    return () => window.removeEventListener('adminEvent', handleAdminEvent as EventListener);
  }, []);

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'quiz_started': return 'play';
      case 'answer_submitted': return 'check';
      case 'quiz_completed': return 'trophy';
      default: return 'info';
    }
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case 'quiz_started': return 'text-green-500';
      case 'answer_submitted': return 'text-blue-500';
      case 'quiz_completed': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        <FontAwesomeIcon icon="chart-line" className="text-xl" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-zinc-800 rounded-lg shadow-2xl border border-zinc-700 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-700">
        <h3 className="text-white font-semibold">Admin Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon="times" />
        </button>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {events.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No events yet</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-start space-x-3 p-2 bg-zinc-700 rounded-lg">
              <FontAwesomeIcon 
                icon={getEventIcon(event.event)} 
                className={`mt-1 ${getEventColor(event.event)}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium capitalize">
                  {event.event.replace('_', ' ')}
                </p>
                <p className="text-gray-400 text-xs">
                  {event.timestamp.toLocaleTimeString()}
                </p>
                <p className="text-gray-300 text-xs truncate">
                  User: {event.userId}
                </p>
                {event.data.quizTitle && (
                  <p className="text-gray-300 text-xs truncate">
                    Quiz: {event.data.quizTitle}
                  </p>
                )}
                {event.data.isCorrect !== undefined && (
                  <p className={`text-xs ${event.data.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {event.data.isCorrect ? 'Correct' : 'Incorrect'}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{events.length} events</span>
          <button
            onClick={() => setEvents([])}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
