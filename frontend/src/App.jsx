import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Generator from './components/Generator';
import History from './components/History';

export default function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('captionHistory')) || [];
    setHistory(saved);
  }, []);

  const addHistoryItem = (item) => {
    const updated = [item, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('captionHistory', JSON.stringify(updated));
  };

  // Naya function History clear karne ke liye
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
      localStorage.removeItem('captionHistory');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Hero />
      
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('generate')}
            className={`px-6 py-3 font-semibold ${activeTab === 'generate' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Generate Caption
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 font-semibold ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Previous Captions
          </button>
        </div>

        {activeTab === 'generate' ? (
          <Generator addHistoryItem={addHistoryItem} />
        ) : (
          <History history={history} clearHistory={clearHistory} />
        )}
      </div>
    </div>
  );
}