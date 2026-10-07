import React, { useState } from 'react';
import { ShieldAlert, Lightbulb, Copy, BookmarkPlus, Check, Loader2 } from 'lucide-react';
import { SavedItem } from '../types';
import { OBJECTION_PRESETS } from '../data';

interface ObjectionHandlerProps {
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const ObjectionHandler: React.FC<ObjectionHandlerProps> = ({ onSaveItem, showToast }) => {
  const [objectionText, setObjectionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [saved, setSaved] = useState(false);

  const handleGenerate = async () => {
    if (!objectionText.trim()) {
      showToast('សូមបញ្ចូលក្តីបារម្ភ ឬការបដិសេធរបស់អតិថិជនសិន!', 'error');
      return;
    }
    setLoading(true);
    setSaved(false);
    try {
      const systemInstruction = "Act as a master sales closer in luxury real estate for Borey Mean Chey Residences. Your job is to help sales agents overcome customer objections gracefully and effectively in Khmer using psychological principles and value-based selling.";
      const prompt = `A customer gave this objection: "${objectionText}". Provide a 3-step strategy and exact script on how the sales agent should respond to overcome this objection smoothly. Use the 'Feel, Felt, Found' method or value-based selling techniques.`;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemInstruction, prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.text);
      } else {
        showToast(data.error || 'Failed to generate', 'error');
      }
    } catch (err) {
      showToast('Network error while connecting to AI', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    showToast('បានចម្លងយុទ្ធសាស្ត្រដោយជោគជ័យ!', 'success');
  };

  const handleSave = () => {
    if (!result) return;
    onSaveItem({
      type: 'objection',
      title: `Objection: ${objectionText.substring(0, 30)}...`,
      content: result,
    });
    setSaved(true);
    showToast('បានរក្សាទុកក្នុងបណ្ណាល័យ!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 md:pb-0">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
          <ShieldAlert className="text-amber-400 w-6 h-6" /> Objection Handling AI
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-khmer">ជំនួយការផ្តល់យុទ្ធសាស្ត្រតបតនិងបង្វែរការបដិសេធរបស់អតិថិជនឱ្យក្លាយជាឱកាសលក់។</p>
      </div>

      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 shadow-sm space-y-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">បញ្ហា និងការបដិសេធទូទៅ (Presets)</label>
          <div className="flex flex-wrap gap-2">
            {OBJECTION_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setObjectionText(preset)}
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg hover:border-amber-500 hover:text-white transition"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">បញ្ជាក់ក្តីបារម្ភ ឬការបដិសេធរបស់អតិថិជន</label>
          <textarea
            rows={3}
            value={objectionText}
            onChange={(e) => setObjectionText(e.target.value)}
            placeholder="ឧ. អតិថិជននិយាយថា ពួកគាត់ចង់គិតមើលសិន ឬសួរនាំកន្លែងផ្សេងទៀត..."
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-amber-500 focus:outline-none transition"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-900/50 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
          {loading ? 'កំពុងវិភាគយុទ្ធសាស្ត្រ...' : 'រកវិធីដោះស្រាយ ✨'}
        </button>
      </div>

      {(loading || result) && (
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-5 relative shadow-inner space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> AI Strategy Result
            </span>
            {result && !loading && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    saved
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  {saved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                  {saved ? 'បានរក្សាទុករួច' : 'Save'}
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-amber-400 font-medium py-6 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> កំពុងរៀបចំយុទ្ធសាស្ត្រទប់ទល់ការបដិសេធ...
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
