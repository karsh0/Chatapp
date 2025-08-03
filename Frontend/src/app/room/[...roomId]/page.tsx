'use client';

import { Send } from "lucide-react";

const Room = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-orange-400 text-black px-4 py-6">
      <div className="max-w-3xl h-[95vh] mx-auto flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Testroom</h1>
          <button className="bg-red-500 hover:bg-red-600 transition-colors px-5 py-2 rounded-lg text-sm font-medium text-white cursor-pointer">
            Leave Room
          </button>
        </header>

        <div className="h-full flex flex-col justify-between bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md overflow-hidden border border-orange-200">
          <div className="flex-1 overflow-y-auto pr-1 space-y-6">
            <div>
              <div className="text-sm text-gray-700 font-medium mb-1">Anthony</div>
              <div className="bg-white p-3 rounded-xl shadow-sm text-sm max-w-fit">
                Hello everyone!
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-700 font-medium mb-1">You</div>
              <div className="bg-blue-100 p-3 rounded-xl shadow-sm text-sm max-w-fit ml-auto">
                Hi Anthony 👋
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-white/90 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-transform text-white p-3 rounded-lg cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
