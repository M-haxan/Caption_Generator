import React, { useState } from 'react';

export default function Generator({ addHistoryItem }) {
  const [keywords, setKeywords] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium (2-3 sentences)'); // Nayi state
  
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form aur result clear karne ka function
  const handleClear = () => {
    setKeywords('');
    setCaption('');
    setError('');
    setPlatform('LinkedIn');
    setTone('Professional');
    setLength('Medium (2-3 sentences)');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (keywords.trim().length < 3) {
      setError('Please provide at least 3 characters.');
      return;
    }

    setError('');
    setCaption('');
    setIsLoading(true);

    try {
      // Length variable ko body mein bheja
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords, platform, tone, length }) 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API Error occurred.');
      }
      
      setCaption(data.caption);

      addHistoryItem({
        id: Date.now(),
        platform,
        tone,
        length,
        keywords,
        caption: data.caption,
        date: new Date().toLocaleDateString()
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Keywords / Topic</label>
          <textarea 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows="3"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Platform</label>
            <select 
              className="w-full p-2 border rounded-lg"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>LinkedIn</option>
              <option>Instagram</option>
              <option>Twitter (X)</option>
              <option>TikTok</option>
              <option>FaceBook</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Tone</label>
            <select 
              className="w-full p-2 border rounded-lg"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Witty</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Length</label>
            <select 
              className="w-full p-2 border rounded-lg"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option>Short (1-2 sentences)</option>
              <option>Medium (2-3 sentences)</option>
              <option>Long (Detailed post)</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border rounded-lg text-sm">
            🚨 {error}
          </div>
        )}

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className={`flex-1 py-3 rounded-lg font-bold text-white ${
              isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? '⏳ Generating...' : '✨ Generate Caption'}
          </button>
          
          <button 
            type="button" 
            onClick={handleClear}
            disabled={isLoading}
            className="px-6 py-3 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300"
          >
            Clear
          </button>
        </div>
      </form>

      {caption && (
        <div className="mt-6 p-4 bg-blue-50 border rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">Result:</h3>
          <p className="whitespace-pre-wrap text-gray-800">{caption}</p>
        </div>
      )}
    </div>
  );
}