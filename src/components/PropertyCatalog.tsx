import React from 'react';
import { Building2, Bed, Bath, Maximize2, Sparkles } from 'lucide-react';
import { PROPERTIES } from '../data';
import { TabType } from '../types';

interface PropertyCatalogProps {
  onSelectPropertyForScript: (propertyName: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({ onSelectPropertyForScript, onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-16 md:pb-0">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-poppins">
          <Building2 className="text-cyan-400 w-6 h-6" /> Borey Mean Chey Inventory
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-khmer">បញ្ជីផ្ទះ និងវីឡាប្រណិតៗសម្រាប់ធ្វើការណែនាំ និងលក់ជូនអតិថិជន។</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROPERTIES.map((prop) => (
          <div key={prop.id} className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src={prop.image}
                alt={prop.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-slate-700">
                {prop.price}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-white font-poppins">{prop.name}</h3>
                  <span className="text-xs text-slate-400 font-khmer">{prop.khmerName}</span>
                </div>
                <p className="text-xs text-slate-300 font-khmer leading-relaxed line-clamp-2">{prop.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-700/60 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-emerald-400" />
                  <span>{prop.bedrooms} បន្ទប់គេង</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-blue-400" />
                  <span>{prop.bathrooms} បន្ទប់ទឹក</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span className="truncate">{prop.size.split(' ')[0]}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {prop.features.map((feat, i) => (
                  <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                    {feat}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  onSelectPropertyForScript(prop.name);
                  onNavigate('script');
                }}
                className="w-full py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold text-xs rounded-xl border border-emerald-500/30 flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> បង្កើតសារលក់សម្រាប់ {prop.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
