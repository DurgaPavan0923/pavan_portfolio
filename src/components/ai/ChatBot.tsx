'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Trash2, ShieldCheck, User } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

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
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-5 right-5 z-[90] flex items-center gap-2 px-3.5 py-3 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-600 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all group"
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
            <span className="hidden sm:inline font-display tracking-tight">Ask AI</span>
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
                <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">Gemini 1.5 Grounded Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-colors"
                title="Clear Chat History"
                aria-label="Clear chat history"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 dark:border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isAssistant
                        ? 'bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/[0.06] shadow-sm'
                        : 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-medium ml-auto shadow-md'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {!isAssistant && (
                    <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/[0.1] text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
                <span>Neural Assistant is synthesizing response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 border-t border-slate-200 dark:border-white/[0.04] bg-slate-50/50 dark:bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-white/[0.04] hover:bg-cyan-50 dark:hover:bg-cyan-500/10 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-white/[0.06] transition-colors shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-950/80 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              placeholder="Ask anything about Pavan's projects..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-cyan-500 dark:focus:border-cyan-400/50"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 text-slate-950 font-bold transition-all"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
