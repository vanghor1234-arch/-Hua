import React from 'react';
import { TabType } from '../types';
import { MessageSquareText, Mail, ShieldAlert, Hash, MessageSquare, Globe, BookmarkCheck, Building2, Headset } from 'lucide-react';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, savedCount }) => {
  const menuItems: { id: TabType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'script', label: 'Sales Script & Reply', icon: <MessageSquareText className="w-5 h-5" />, color: 'text-emerald-400' },
    { id: 'email', label: 'VIP Email Pitch', icon: <Mail className="w-5 h-5" />, color: 'text-blue-400' },
    { id: 'objection', label: 'Objection Handling', icon: <ShieldAlert className="w-5 h-5" />, color: 'text-amber-400' },
    { id: 'social', label: 'Social Media Post', icon: <Hash className="w-5 h-5" />, color: 'text-fuchsia-400' },
    { id: 'chat', label: 'Rose Marvel AI Chat', icon: <MessageSquare className="w-5 h-5" />, color: 'text-teal-400' },
    { id: 'market', label: 'Market & Search Grounding', icon: <Globe className="w-5 h-5" />, color: 'text-cyan-400' },
    { id: 'catalog', label: 'Property Inventory', icon: <Building2 className="w-5 h-5" />, color: 'text-indigo-400' },
    { id: 'saved', label: `Saved Library (${savedCount})`, icon: <BookmarkCheck className="w-5 h-5" />, color: 'text-rose-400' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 h-full bg-slate-900 border-r border-slate-800 z-20 shadow-xl">
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg text-lg">
          <Headset className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 tracking-wide text-sm font-poppins">Rose Marvel</h1>
          <p className="text-xs text-emerald-400 font-medium">AI Sales Assistant</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-emerald-400' : item.color}>{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Sales+Agent&background=10b981&color=fff"
            alt="Agent"
            className="w-10 h-10 rounded-full border-2 border-emerald-500/30"
          />
          <div>
            <p className="text-sm font-semibold text-slate-200">Sales Consultant</p>
            <p className="text-xs text-slate-400">Borey Mean Chey</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
