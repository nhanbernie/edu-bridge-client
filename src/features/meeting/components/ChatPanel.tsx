"use client";

import React, { useState } from "react";
import { X, Send } from "lucide-react";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: { userId: string; message: string }[];
  onSendMessage: (message: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose, messages, onSendMessage }) => {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">In-call messages</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Messages Area - Takes remaining space */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No chat messages yet</p>
          </div>
        ) : (
          /* Messages List */
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {msg.userId}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim()) {
                onSendMessage(message.trim());
                setMessage("");
              }
            }}
            placeholder="Send a message"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={() => {
              if (message.trim()) {
                onSendMessage(message.trim());
                setMessage("");
              }
            }}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
