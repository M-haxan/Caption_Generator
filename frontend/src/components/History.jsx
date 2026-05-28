import React from 'react';
import { MdAutoDelete } from "react-icons/md";


export default function History({ history, clearHistory }) {
    if (history.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border">
                <p className="text-gray-500">No captions generated yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-end mb-4">
                <button
                    onClick={clearHistory}
                    className="text-sm px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-semibold border border-red-200"
                >
                    <MdAutoDelete /> Clear All History
                </button>
            </div>

            <div className="space-y-4">
                {history.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border shadow-sm">
                        <div className="flex gap-2 mb-2 flex-wrap">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                                {item.platform}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">
                                {item.length}
                            </span>
                            <span className="text-xs text-gray-500 mt-1 ml-auto">{item.date}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded text-sm text-gray-800 whitespace-pre-wrap border">
                            {item.caption}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}