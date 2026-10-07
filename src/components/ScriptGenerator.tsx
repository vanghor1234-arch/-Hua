import React, { useState } from 'react';
import { MessageSquareText, Wand2, Copy, BookmarkPlus, Check, Loader2 } from 'lucide-react';
import { SavedItem } from '../types';

interface ScriptGeneratorProps {
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({ onSaveItem, showToast }) => {
  const [inquiryType, setInquiryType] = useState('សួរពីតម្លៃ និងលក្ខខណ្ឌបង់ប្រាក់');
  const [property, setProperty] = useState('Princess Villa');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [saved, setSaved] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const systemInstruction = "Act as a top-performing luxury real estate sales consultant for Borey Mean Chey Residences. Your goal is to reply to customers politely, professionally, and persuasively in Khmer.";
      const prompt = `Write a chat/message reply script for a customer who is asking about: "${inquiryType}" for the property: "${property}". Additional context: ${context}. The reply should be welcoming, highlight value, and include a call to action (like inviting them for a site visit).`;

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
    showToast('បានចម្លងសារដោយជោគជ័យ!', 'success');
  };

  const handleSave = () => {
    if (!result) return;
    onSaveItem({
      type: 'script',
      title: `${property} - ${inquiryType}`,
      content: result,
      metadata: { property }
    });
    setSaved(true);
    showToast('បានរក្សាទុកក្នុងបណ្ណាល័យ!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 md:pb-0">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
          <MessageSquareText className="text-emerald-400 w-6 h-6" /> AI Sales Script & Reply
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-khmer">បង្កើតសារឆ្លើយតបទៅកាន់អតិថិជនរហ័សទាន់ចិត្តតាមរយៈ AI ប្រកបដោយវិជ្ជាជីវៈ។</p>
      </div>

      <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">ប្រភេទសំណួរ (Inquiry Type)</label>
          <select
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition"
          >
            <option value="សួរពីតម្លៃ និងលក្ខខណ្ឌបង់ប្រាក់">សួរពីតម្លៃ និងលក្ខខណ្ឌបង់ប្រាក់</option>
            <option value="សួរពីទីតាំង និងសក្តានុពល">សួរពីទីតាំង និងសក្តានុពល</option>
            <option value="សួរពីការធានាគុណភាពសំណង់">សួរពីការធានាគុណភាពសំណង់</option>
            <option value="សុំមើលផ្ទះគំរូ">សុំមើលផ្ទះគំរូ (Site Visit)</option>
            <option value="សួររឿងបញ្ចុះតម្លៃ និងប្រូម៉ូសិន">សួររឿងបញ្ចុះតម្លៃ និងប្រូម៉ូសិន</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">ប្រភេទផ្ទះ (Target Property)</label>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition"
          >
            <option value="Princess Villa">Princess Villa</option>
            <option value="Twin Villa">Twin Villa</option>
            <option value="Shophouse">Shophouse</option>
            <option value="King Villa">King Villa</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">ចំណុចបន្ថែមពីអតិថិជន (Context / Customer Details)</label>
          <textarea
            rows={2}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="ឧ. អតិថិជនជាម្ចាស់អាជីវកម្ម ចង់បានបង់រំលស់គ្មានការប្រាក់១២ខែដំបូង..."
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:border-emerald-500 focus:outline-none transition"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
          {loading ? 'កំពុងបង្កើតសារ...' : 'បង្កើតសារឆ្លើយតប ✨'}
        </button>
      </div>

      {(loading || result) && (
        <div className="bg-slate-900 border border-emerald-900/50 rounded-2xl p-5 relative shadow-inner space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5" /> AI Script Result
            </span>
            {result && !loading && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    saved
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
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
            <div className="flex items-center gap-2 text-emerald-400 font-medium py-6 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> កំពុងរៀបចំសារឆ្លើយតបប្រកបដោយវិជ្ជាជីវៈ...
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
