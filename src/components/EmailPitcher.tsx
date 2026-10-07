import React, { useState } from 'react';
import { Mail, PenTool, Copy, BookmarkPlus, Check, Loader2 } from 'lucide-react';
import { SavedItem } from '../types';

interface EmailPitcherProps {
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const EmailPitcher: React.FC<EmailPitcherProps> = ({ onSaveItem, showToast }) => {
  const [target, setTarget] = useState('CEO & Business Owner');
  const [objective, setObjective] = useState('អញ្ជើញចូលរួម VIP Private Preview Event');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [saved, setSaved] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const systemInstruction = "Act as a luxury real estate sales director for Borey Mean Chey Residences. Write a professional, high-end email pitch in Khmer and English / professional format.";
      const prompt = `Write an email addressed to a ${target} with the objective to: ${objective}. Highlight the exclusivity, prestige, and prime location (60m road, near AEON 3) of Borey Mean Chey Residences. Format it with a subject line and professional sign-off.`;

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
    showToast('បានចម្លងអ៊ីមែលដោយជោគជ័យ!', 'success');
  };

  const handleSave = () => {
    if (!result) return;
    onSaveItem({
      type: 'email',
      title: `VIP Email - ${target}`,
      content: result,
      metadata: { target }
    });
    setSaved(true);
    showToast('បានរក្សាទុកក្នុងបណ្ណាល័យ!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 md:pb-0">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
          <Mail className="text-blue-400 w-6 h-6" /> VIP Email Pitch
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-khmer">សរសេរអ៊ីមែលផ្លូវការ និងទាក់ទាញខ្លាំងសម្រាប់អតិថិជន VIP ឬវិនិយោគិន។</p>
      </div>

      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">មុខតំណែង ឬប្រភេទអតិថិជន (Target Audience)</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="ឧ. CEO, Managing Director, Property Investor"
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">គោលបំណងអ៊ីមែល (Objective)</label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-blue-500 focus:outline-none transition"
          >
            <option value="អញ្ជើញចូលរួម VIP Private Preview Event">អញ្ជើញចូលរួម VIP Private Preview Event</option>
            <option value="ណែនាំគម្រោងថ្មីដើម្បីវិនិយោគរកផលចំណេញ">ណែនាំគម្រោងថ្មីដើម្បីវិនិយោគរកផលចំណេញ</option>
            <option value="Follow-up បន្ទាប់ពីទស្សនាផ្ទះគំរូ (Site Visit)">Follow-up បន្ទាប់ពីទស្សនាផ្ទះគំរូ (Site Visit)</option>
            <option value="ស្នើសុំកិច្ចប្រជុំពិភាក្សាផ្ទាល់ (Private Meeting)">ស្នើសុំកិច្ចប្រជុំពិភាក្សាផ្ទាល់ (Private Meeting)</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <PenTool className="w-5 h-5" />}
          {loading ? 'កំពុងសរសេរអ៊ីមែល...' : 'សរសេរអ៊ីមែល VIP ✨'}
        </button>
      </div>

      {(loading || result) && (
        <div className="bg-slate-900 border border-blue-900/50 rounded-2xl p-5 relative shadow-inner space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> VIP Email Result
            </span>
            {result && !loading && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    saved
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
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
            <div className="flex items-center gap-2 text-blue-400 font-medium py-6 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> កំពុងរៀបចំអ៊ីមែលអាជីវកម្មប្រណិត...
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
