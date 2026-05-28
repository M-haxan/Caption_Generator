import React from 'react';

export default function History({ history }) {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border">
        <p className="text-gray-500">No captions generated yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {history.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
              {item.platform}
            </span>
            <span className="text-xs text-gray-500 mt-1">{item.date}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded text-sm text-gray-800 whitespace-pre-wrap border">
            {item.caption}
          </div>
        </div>
      ))}
    </div>
  );
}