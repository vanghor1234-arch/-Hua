export type TabType = 'script' | 'email' | 'objection' | 'social' | 'chat' | 'market' | 'catalog' | 'saved';

export interface SavedItem {
  id: string;
  type: 'script' | 'email' | 'objection' | 'social' | 'chat' | 'market';
  title: string;
  content: string;
  createdAt: string;
  metadata?: {
    property?: string;
    target?: string;
    platform?: string;
  };
}

export interface PropertyItem {
  id: string;
  name: string;
  khmerName: string;
  price: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image: string;
  features: string[];
}
