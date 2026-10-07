import React, { useState } from 'react';
import { Hash, Sparkles, Copy, BookmarkPlus, Check, Loader2 } from 'lucide-react';
import { SavedItem } from '../types';

interface SocialGeneratorProps {
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const SocialGenerator: React.FC<SocialGeneratorProps> = ({ onSaveItem, showToast }) => {
  const [platform, setPlatform] = useState('Facebook Post');
  const [topic, setTopic] = useState('ប្រូម៉ូសិនពិសេសប្រចាំខែ');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [saved, setSaved] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const systemInstruction = "Act as an expert real estate social media marketing manager in Cambodia for Borey Mean Chey Residences. Create engaging, high-converting social media copy in Khmer. Format appropriately for the specific platform, use highly relevant emojis, and include standard hashtags like #BoreyMeanCheyResidences #RealEstateCambodia.";
      const prompt = `Write a ${platform} post focusing on the topic: "${topic}". Include these additional offer details: "${details}". The tone should be exciting and luxurious. Include a strong Call to Action (CTA) at the end guiding them to contact the sales team or visit the showroom.`;

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
    showToast('បានចម្លងមាតិកាដោយជោគជ័យ!', 'success');
  };

  const handleSave = () => {
    if (!result) return;
    onSaveItem({
      type: 'social',
      title: `${platform} - ${topic}`,
      content: result,
      metadata: { platform }
    });
    setSaved(true);
    showToast('បានរក្សាទុកក្នុងបណ្ណាល័យ!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 md:pb-0">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
          <Hash className="text-fuchsia-400 w-6 h-6" /> AI Social Media Post
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-khmer">បង្កើតមាតិកា និង Caption សម្រាប់បង្ហោះលើ Facebook, Telegram ឬ TikTok ទាក់ទាញចំណាប់អារម្មណ៍ខ្ពស់។</p>
      </div>

      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">គោលដៅបណ្តាញសង្គម (Platform)</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-fuchsia-500 focus:outline-none transition"
          >
            <option value="Facebook Post">Facebook (Caption វែង រៀបរាប់លម្អិត និងទាក់ទាញ)</option>
            <option value="Telegram Message">Telegram (ខ្លីៗ ចំចំណុច ងាយអាន មានសញ្ញា Emoji)</option>
            <option value="TikTok/Reels Caption">TikTok/Reels (Caption ខ្លីកំប្លែង ឬទាក់ទាញអារម្មណ៍)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">ប្រធានបទផ្សព្វផ្សាយ (Post Topic)</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-fuchsia-500 focus:outline-none transition"
          >
            <option value="ប្រូម៉ូសិនពិសេសប្រចាំខែ">ការផ្តល់ជូនប្រូម៉ូសិនពិសេស</option>
            <option value="លក់ដាច់អស់គម្រោង Phase 1">ប្រកាសលក់ដាច់អស់ (Sold Out Phase)</option>
            <option value="បង្ហាញសក្តានុពលទីតាំង និងគុណភាពសំណង់">បង្ហាញសក្តានុពលទីតាំង និងគុណភាពសំណង់</option>
            <option value="អញ្ជើញមកទស្សនាផ្ទះគំរូសប្តាហ៍នេះ">អញ្ជើញមកទស្សនាផ្ទះគំរូសប្តាហ៍នេះ</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">ព័ត៌មានលម្អិតបន្ថែម (Offer Details)</label>
          <textarea
            rows={2}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="ឧ. បញ្ចុះតម្លៃពិសេស $10,000, ថែមជូនសម្ភារៈផ្ទះបាយទំនើប ឬរំលស់សុទ្ធ..."
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-fuchsia-500 focus:outline-none transition"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-fuchsia-900/50 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {loading ? 'កំពុងរៀបចំមាតិកា...' : 'បង្កើតមាតិកាផ្សព្វផ្សាយ ✨'}
        </button>
      </div>

      {(loading || result) && (
        <div className="bg-slate-900 border border-fuchsia-900/50 rounded-2xl p-5 relative shadow-inner space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-fuchsia-400 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" /> Social Post Result
            </span>
            {result && !loading && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    saved
                      ? 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30'
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
            <div className="flex items-center gap-2 text-fuchsia-400 font-medium py-6 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> កំពុងសរសេរមាតិកាប្រកបដោយភាពទាក់ទាញ...
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
