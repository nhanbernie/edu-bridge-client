"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: { userId: string; message: string }[];
  onSendMessage: (message: string) => void;
  currentUserId: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  currentUserId,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-900 shadow-xl flex flex-col pl-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Messages Area - Takes remaining space */}
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No messages yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Start a conversation</p>
          </div>
        ) : (
          /* Messages List */
          <>
            {messages.map((msg, index) => {
              const isCurrentUser = msg.userId === currentUserId;

              return (
                <div
                  key={index}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      isCurrentUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    {!isCurrentUser && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Participant
                      </div>
                    )}
                    <div className="text-sm break-words">{msg.message}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input - Fixed at bottom with clean design */}
      <div className="px-4 pb-6 pt-4">
        <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-sm">
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
            className="flex-1 px-5 py-3 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <button
            onClick={() => {
              if (message.trim()) {
                onSendMessage(message.trim());
                setMessage("");
              }
            }}
            className="mr-2 p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400"
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
