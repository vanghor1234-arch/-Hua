import React from 'react';
import { TabType } from '../types';
import { MessageSquareText, Mail, ShieldAlert, Hash, MessageSquare, Globe, Building2, BookmarkCheck, Headset } from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, savedCount }) => {
  const mobTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'script', label: 'Script', icon: <MessageSquareText className="w-5 h-5" /> },
    { id: 'email', label: 'Email', icon: <Mail className="w-5 h-5" /> },
    { id: 'objection', label: 'Handling', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'social', label: 'Social', icon: <Hash className="w-5 h-5" /> },
    { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'market', label: 'Market', icon: <Globe className="w-5 h-5" /> },
    { id: 'catalog', label: 'Properties', icon: <Building2 className="w-5 h-5" /> },
    { id: 'saved', label: `Saved (${savedCount})`, icon: <BookmarkCheck className="w-5 h-5" /> },
  ];

  return (
    <>
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow text-sm">
            <Headset className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-sm font-poppins">Rose Marvel AI</h1>
          </div>
        </div>
        <img
          src="https://ui-avatars.com/api/?name=Sales+Agent&background=10b981&color=fff"
          alt="Agent"
          className="w-8 h-8 rounded-full border border-slate-700"
        />
      </header>

      <nav className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 fixed bottom-0 left-0 w-full z-30 pb-safe overflow-x-auto scrollbar-none">
        <div className="flex items-center h-16 min-w-max px-2 gap-1">
          {mobTabs.map((t) => {
            const isActive = currentTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTab(t.id)}
                className={`flex flex-col items-center justify-center px-2 py-1 transition rounded-xl ${
                  isActive ? 'text-emerald-400 font-semibold bg-emerald-500/10' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.icon}
                <span className="text-[9px] mt-0.5">{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
