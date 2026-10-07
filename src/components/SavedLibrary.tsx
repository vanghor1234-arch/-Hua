import React, { useState } from 'react';
import { BookmarkCheck, Trash2, Copy, MessageSquareText, Mail, ShieldAlert, Hash, MessageSquare, Globe, Search, Filter, Download, Printer, ClipboardCopy } from 'lucide-react';
import { SavedItem } from '../types';

interface SavedLibraryProps {
  items: SavedItem[];
  onDeleteItem: (id: string) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const SavedLibrary: React.FC<SavedLibraryProps> = ({ items, onDeleteItem, showToast }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'script': return <MessageSquareText className="w-4 h-4 text-emerald-400" />;
      case 'email': return <Mail className="w-4 h-4 text-blue-400" />;
      case 'objection': return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'social': return <Hash className="w-4 h-4 text-fuchsia-400" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-teal-400" />;
      case 'market': return <Globe className="w-4 h-4 text-cyan-400" />;
      default: return <BookmarkCheck className="w-4 h-4 text-rose-400" />;
    }
  };

  const getTagName = (type: string) => {
    switch (type) {
      case 'script': return 'Script';
      case 'email': return 'Email';
      case 'objection': return 'Objection';
      case 'social': return 'Social';
      case 'chat': return 'Chat';
      case 'market': return 'Market';
      default: return 'General';
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case 'script': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'email': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'objection': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'social': return 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30';
      case 'chat': return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
      case 'market': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default: return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    showToast('បានចម្លងមាតិកាដោយជោគជ័យ!', 'success');
  };

  const handleCopyAllFiltered = () => {
    if (filteredItems.length === 0) {
      showToast('គ្មានទិន្នន័យសម្រាប់ Copy ទេ', 'error');
      return;
    }
    const textContent = filteredItems
      .map(item => `[${item.type.toUpperCase()}] ${item.title}\nDate: ${item.createdAt}\n\n${item.content}\n\n--------------------------------------------------\n\n`)
      .join('');
    navigator.clipboard.writeText(textContent);
    showToast(`បានចម្លងទិន្នន័យ ${filteredItems.length} ទៅកាន់ Clipboard ជោគជ័យ!`, 'success');
  };

  const handleExportText = () => {
    if (filteredItems.length === 0) {
      showToast('គ្មានទិន្នន័យសម្រាប់ Export ទេ', 'error');
      return;
    }
    const textContent = filteredItems
      .map(item => `[${item.type.toUpperCase()}] ${item.title}\nDate: ${item.createdAt}\n\n${item.content}\n\n--------------------------------------------------\n\n`)
      .join('');
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RoseMarvel_Library_${selectedTag}_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('បានទាញយករួចរាល់ជាឯកសារ Text (.txt)!', 'success');
  };

  const handlePrintPdf = () => {
    if (filteredItems.length === 0) {
      showToast('គ្មានទិន្នន័យសម្រាប់ Print/PDF ទេ', 'error');
      return;
    }
    window.print();
  };

  const filteredItems = items.filter((item) => {
    const matchesTag = selectedTag === 'all' || item.type === selectedTag;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'ទាំងអស់ (All)' },
    { id: 'script', label: 'Scripts' },
    { id: 'email', label: 'Emails' },
    { id: 'objection', label: 'Objections' },
    { id: 'social', label: 'Social' },
    { id: 'chat', label: 'Chat Q&A' },
    { id: 'market', label: 'Market' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16 md:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
            <BookmarkCheck className="text-rose-400 w-6 h-6" /> Saved Library ({items.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-khmer">បណ្តុំសារ អ៊ីមែល យុទ្ធសាស្ត្រ និងមាតិកាដែលបានរក្សាទុក ងាយស្រួលចម្លង និង Export។</p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyAllFiltered}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition shadow-sm"
              title="Copy All Filtered to Clipboard"
            >
              <ClipboardCopy className="w-3.5 h-3.5 text-teal-400" /> Copy All
            </button>
            <button
              onClick={handleExportText}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition shadow-sm"
              title="Export as Text File"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" /> Export .txt
            </button>
            <button
              onClick={handlePrintPdf}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition shadow-sm"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" /> Print / PDF
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ស្វែងរកក្នុងបណ្ណាល័យ (Search saved items)..."
            className="w-full bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 focus:border-rose-500 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
          {categories.map((cat) => {
            const isSelected = selectedTag === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTag(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border border-slate-700/80 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-300">រកមិនឃើញទិន្នន័យដែលត្រូវគ្នាទេ</p>
          <p className="text-xs text-slate-500 font-khmer">សូមប្តូរពាក្យស្វែងរក ឬជ្រើសរើសប្រភេទ Tag ផ្សេង។</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm text-white font-poppins">{item.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${getTagColor(item.type)}`}>
                        {getTagName(item.type)}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item.content)}
                    className="p-2 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 rounded-lg border border-rose-900/50 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 text-xs text-slate-300 font-khmer whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
