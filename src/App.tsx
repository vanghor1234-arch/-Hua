import React, { useState, useEffect } from 'react';
import { TabType, SavedItem } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ScriptGenerator } from './components/ScriptGenerator';
import { EmailPitcher } from './components/EmailPitcher';
import { ObjectionHandler } from './components/ObjectionHandler';
import { SocialGenerator } from './components/SocialGenerator';
import { Chatbot } from './components/Chatbot';
import { MarketSearch } from './components/MarketSearch';
import { PropertyCatalog } from './components/PropertyCatalog';
import { SavedLibrary } from './components/SavedLibrary';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('script');
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const local = localStorage.getItem('rose_marvel_saved');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('rose_marvel_saved', JSON.stringify(savedItems));
    } catch (e) {
      console.error(e);
    }
  }, [savedItems]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleSaveItem = (item: Omit<SavedItem, 'id' | 'createdAt'>) => {
    const newItem: SavedItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toLocaleDateString('km-KH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setSavedItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('បានលុបចេញពីបណ្ណាល័យ', 'info');
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-slate-950 text-slate-100 font-poppins">
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} savedCount={savedItems.length} />

      <main className="flex-1 h-full flex flex-col relative overflow-hidden bg-slate-950">
        <Header currentTab={currentTab} onSelectTab={setCurrentTab} savedCount={savedItems.length} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth">
          <div className="max-w-3xl mx-auto">
            {currentTab === 'script' && <ScriptGenerator onSaveItem={handleSaveItem} showToast={showToast} />}
            {currentTab === 'email' && <EmailPitcher onSaveItem={handleSaveItem} showToast={showToast} />}
            {currentTab === 'objection' && <ObjectionHandler onSaveItem={handleSaveItem} showToast={showToast} />}
            {currentTab === 'social' && <SocialGenerator onSaveItem={handleSaveItem} showToast={showToast} />}
            {currentTab === 'chat' && <Chatbot onSaveItem={handleSaveItem} showToast={showToast} />}
            {currentTab === 'market' && <MarketSearch onSaveItem={handleSaveItem} showToast={showToast} />}
            {currentTab === 'catalog' && (
              <PropertyCatalog
                onSelectPropertyForScript={(propertyName) => {
                  setCurrentTab('script');
                }}
                onNavigate={setCurrentTab}
              />
            )}
            {currentTab === 'saved' && (
              <SavedLibrary
                items={savedItems}
                onDeleteItem={handleDeleteSavedItem}
                showToast={showToast}
              />
            )}
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
