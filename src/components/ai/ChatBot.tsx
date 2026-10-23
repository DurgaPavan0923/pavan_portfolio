'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Trash2, ShieldCheck, User } from 'lucide-react';
import { ChatMessage } from '@/types';

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'assistant',
  content: `👋 Hi! I'm Pavan's Neural Assistant. I can answer inquiries regarding his AI & ML projects, Graph RAG architectures, internships at TIH IIT Guwahati & Microsoft Elevate, and technical toolkit. How can I assist you today?`,
  timestamp: Date.now(),
};

const SUGGESTED_PROMPTS = [
  'What AI projects has Pavan built?',
  'Tell me about his Graph RAG & Neo4j experience',
  'What is FactLens AI?',
  'What internships and leadership roles has he held?',
];

export function ChatBot({ isOpen, onToggle, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and handle Escape key to close dialog
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      // Handle streaming or JSON response
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/event-stream') || res.body) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantReply = '';
        const assistantId = `assistant-${Date.now()}`;

        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: '', timestamp: Date.now() },
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            assistantReply += chunk;

            setMessages((prev) =>
              prev.map((msg) => (msg.id === assistantId ? { ...msg, content: assistantReply } : msg))
            );
          }
        }
      } else {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: data.reply || "I'm ready to answer questions about Pavan's portfolio.",
            timestamp: Date.now(),
          },
        ]);
      }
    } catch (err) {
      console.warn('Chat request failed, rendering graceful offline response:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: `I'm currently running in offline portfolio mode. Pavan is an AI/ML Engineer specializing in Retrieval-Augmented Generation (RAG) and cloud platforms. You can download his official resume directly from [/Rajana.pdf](/Rajana.pdf) or contact him at [rdpkumar2308@gmail.com](mailto:rdpkumar2308@gmail.com).`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* Desktop Floating Action Button (Mobile uses bottom dock) */}
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-5 right-5 z-[80] hidden lg:flex items-center gap-2 px-3.5 py-3 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-600 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all group"
        aria-label={isOpen ? 'Close AI Assistant' : 'Open Neural AI Assistant'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-slate-950" />
        ) : (
          <>
            <div className="relative">
              <Bot className="w-5 h-5 text-slate-950 transition-transform group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="font-display tracking-tight">Ask AI</span>
          </>
        )}
      </button>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pavan Neural AI Assistant"
          className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] rounded-3xl glass-panel border border-slate-200 dark:border-white/[0.12] shadow-2xl z-[90] flex flex-col overflow-hidden animate-fade-up backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/90 dark:bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-slate-950 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span>Neural Assistant</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">Grounded Portfolio Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap break-words ${
                      isAssistant
                        ? 'bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-slate-200'
                        : 'bg-cyan-500 text-slate-950 font-medium'
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-flex gap-1 items-center py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                      </span>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-50 dark:hover:bg-cyan-500/10 text-[11px] font-mono text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/[0.08] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/90 dark:bg-slate-950/60 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about FactLens AI, skills, experience..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-cyan-400 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold transition-all"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer Grounding Badge */}
          <div className="px-3 py-1 bg-slate-100/80 dark:bg-slate-950/80 text-[10px] font-mono text-slate-500 text-center border-t border-slate-200/50 dark:border-white/[0.04] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-500" />
            <span>Strictly grounded in repository data · Gemini API</span>
          </div>
        </div>
      )}
    </>
  );
}
