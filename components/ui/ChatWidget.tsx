'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, MessageCircle, Headphones } from 'lucide-react';
import Link from 'next/link';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Nasseh Autos. How can our team assist you today? You can inquire about our available luxury vehicles, executive car rentals, service bookings, or financing options.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const userMsg: Message = {
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      let botReply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('buy') || lower.includes('car')) {
        botReply =
          'We have a wide range of Foreign Used (Tokunbo) and New luxury vehicles including Toyota Camry, Lexus RX350, Mercedes-Benz GLE450, and Toyota Prado. Visit our Inventory page or click WhatsApp to speak directly with an advisor!';
      } else if (lower.includes('rent') || lower.includes('hire')) {
        botReply =
          'Our rental fleet includes executive SUVs and sedans starting from ₦65,000/day. You can browse available rental cars under the "Rent a Car" tab.';
      } else if (lower.includes('service') || lower.includes('repair') || lower.includes('oil') || lower.includes('brake')) {
        botReply =
          'Our Service Center in DSC Township, Udu offers full computer diagnostics, oil changes, brake maintenance, AC servicing, and suspension overhauls. You can book an appointment online or track your service status!';
      } else if (lower.includes('finance') || lower.includes('payment') || lower.includes('loan')) {
        botReply =
          'We assist customers with flexible payment estimation and financing options. Use our Financing Calculator on any vehicle details page to compute monthly estimates!';
      } else if (lower.includes('location') || lower.includes('address') || lower.includes('where')) {
        botReply =
          'Nasseh Autos is located at DSC Township, Udu, Delta State, Nigeria. Opening hours: Mon-Sat 8:00 AM - 6:00 PM.';
      } else {
        botReply =
          'Thank you for your message! For immediate personal assistance, you can chat with our dealership representative on WhatsApp or call 08182700111.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Nasseh Autos, I need assistance.'
  )}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
      {isOpen ? (
        <div className="w-[90vw] sm:w-[380px] h-[500px] bg-brand-black rounded-3xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-red to-zinc-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-white">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold flex items-center gap-1">
                  Customer Assistance
                </h4>
                <p className="text-[11px] text-slate-300">Nasseh Autos &bull; Udu</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-950/60 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-brand-red text-white rounded-br-none font-medium shadow-md'
                      : 'bg-zinc-800 text-slate-200 border border-zinc-700/60 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Action Badges */}
          <div className="px-3 py-2 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto text-[11px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-600/40 text-emerald-400 font-bold flex items-center gap-1 shrink-0"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
            <Link
              href="/inventory"
              className="px-2.5 py-1 rounded-lg bg-zinc-800 text-slate-200 hover:text-white font-medium shrink-0"
            >
              Browse Cars
            </Link>
            <Link
              href="/service/book"
              className="px-2.5 py-1 rounded-lg bg-zinc-800 text-slate-200 hover:text-white font-medium shrink-0"
            >
              Book Service
            </Link>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-brand-black border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-brand-red"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-full bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl shadow-brand-red/30 transition-transform hover:scale-105 cursor-pointer border border-white/20"
        >
          <Headphones className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">Customer Support</span>
        </button>
      )}
    </div>
  );
};
