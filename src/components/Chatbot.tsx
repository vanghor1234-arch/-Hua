import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Trash2, BookmarkPlus, Check, Loader2 } from 'lucide-react';
import { SavedItem } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onSaveItem, showToast }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'សួស្តី! ខ្ញុំបម្រើការជា Rose Marvel - ជំនួយការលក់អចលនទ្រព្យផ្ទាល់ខ្លួនរបស់អ្នក។ តើខ្ញុំអាចជួយជ្រោមជ្រែងការលក់ ឬផ្តល់ព័ត៌មានអ្វីខ្លះជូនលោកអ្នកថ្ងៃនេះ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    const userMsg: Message = { role: 'user', text: prompt };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Format history excluding the initial welcome message if needed or passing all
      const apiHistory = newHistory.slice(1, -1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: apiHistory, message: prompt })
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: 'model', text: data.text }]);
      } else {
        showToast(data.error || 'Failed to get chat response', 'error');
      }
    } catch (err) {
      showToast('Network error while communicating with Gemini Chat', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'model',
        text: 'សួស្តី! ខ្ញុំបម្រើការជា Rose Marvel - ជំនួយការលក់អចលនទ្រព្យផ្ទាល់ខ្លួនរបស់អ្នក។ តើខ្ញុំអាចជួយជ្រោមជ្រែងការលក់ ឬផ្តល់ព័ត៌មានអ្វីខ្លះជូនលោកអ្នកថ្ងៃនេះ?'
      }
    ]);
    showToast('បានសម្អាតប្រវត្តិជជែក', 'info');
  };

  const quickPrompts = [
     'សុំគន្លឹះបិទការលក់វីឡាភ្លោះ',
     'ពន្យល់ពីលក្ខខណ្ឌបង់រំលស់គ្មានការប្រាក់',
     'ប្រៀបធៀប Shophouse និង Princess Villa',
     'សរសេរសារទាក់ទាញអតិថិជនថ្មីលើ Telegram'
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-80px)] space-y-4 animate-fade-in pb-16 md:pb-0">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
            <MessageSquare className="text-teal-400 w-6 h-6" /> Rose Marvel AI Chat
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-khmer">សន្ទនាផ្ទាល់ជាមួយ AI Assistant ដើម្បីប្រឹក្សាយោបល់ការលក់គ្រប់ពេលវេលា។</p>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 transition"
          title="Clear Chat"
        >
          <Trash2 className="w-3.5 h-3.5" /> សម្អាត
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-inner">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div key={index} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shrink-0 shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 text-xs sm:text-sm font-khmer leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {!isUser && index > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-700/50 flex justify-end">
                    <button
                      onClick={() => {
                        onSaveItem({
                          type: 'chat',
                          title: `Chat QA: ${msg.text.substring(0, 25)}...`,
                          content: msg.text
                        });
                        showToast('បានរក្សាទុកចម្លើយចូលបណ្ណាល័យ!', 'success');
                      }}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-poppins"
                    >
                      <BookmarkPlus className="w-3 h-3" /> Save to Library
                    </button>
                  </div>
                )}
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shrink-0 shadow animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800 text-slate-400 border border-slate-700/60 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-teal-400" /> Rose Marvel កំពុងគិត និងរៀបចំចម្លើយ...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="shrink-0 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 transition font-khmer"
          >
            💡 {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="សួរសំណួរ ឬពិភាក្សាជាមួយ Rose Marvel AI..."
          className="flex-1 bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition font-khmer"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center transition disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
