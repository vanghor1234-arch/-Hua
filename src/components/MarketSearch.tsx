import React, { useState } from 'react';
import { Globe, Search, Loader2, BookmarkPlus, Copy, Check } from 'lucide-react';
import { SavedItem } from '../types';

interface MarketSearchProps {
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const MarketSearch: React.FC<MarketSearchProps> = ({ onSaveItem, showToast }) => {
  const [query, setQuery] = useState('Current real estate market trends in Phnom Penh Cambodia 2026');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSearch = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setSaved(false);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q })
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.text);
      } else {
        showToast(data.error || 'Failed to search', 'error');
      }
    } catch (err) {
      showToast('Network error while performing search grounding', 'error');
    } finally {
      setLoading(false);
    }
  };

  const presetSearches = [
    'Phnom Penh Borey housing market trends 2026',
    'Bank interest rates for home loans Cambodia',
    'Infrastructure developments around National Road 60m',
    'Real estate investment opportunities in Cambodia'
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16 md:pb-0">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
          <Globe className="text-cyan-400 w-6 h-6" /> Google Search Grounding & Market Intelligence
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-khmer">ស្វែងរកព័ត៌មានទិន្នន័យទីផ្សារអចលនទ្រព្យជាក់ស្តែង និងថ្មីបំផុតតាមរយៈ Google Search Grounding។</p>
      </div>

      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 shadow-sm space-y-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">ប្រធានបទទីផ្សាររហ័ស (Quick Research Topics)</label>
          <div className="flex flex-wrap gap-2">
            {presetSearches.map((ps, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(ps);
                  handleSearch(ps);
                }}
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg hover:border-cyan-500 hover:text-white transition text-left"
              >
                🔍 {ps}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="បញ្ចូលសំណួរស្វែងរកទីផ្សារអចលនទ្រព្យ..."
            className="flex-1 bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none transition"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            ស្វែងរក
          </button>
        </div>
      </div>

      {(loading || result) && (
        <div className="bg-slate-900 border border-cyan-900/50 rounded-2xl p-5 relative shadow-inner space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Google Search Grounded Result
            </span>
            {result && !loading && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSaveItem({
                      type: 'market',
                      title: `Market Research: ${query}`,
                      content: result
                    });
                    setSaved(true);
                    showToast('បានរក្សាទុកក្នុងបណ្ណាល័យ!', 'success');
                  }}
                  disabled={saved}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    saved
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  {saved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                  {saved ? 'បានរក្សាទុករួច' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    showToast('បានចម្លងរបាយការណ៍ទីផ្សារ!', 'success');
                  }}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-cyan-400 font-medium py-8 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> កំពុងទាញយកទិន្នន័យទីផ្សារពិតប្រាកដតាមរយៈ Google Search...
            </div>
          ) : (
            <div className="whitespace-pre-wrap font-khmer text-sm leading-relaxed text-slate-200">
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
