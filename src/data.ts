import { PropertyItem } from './types';

export const PROPERTIES: PropertyItem[] = [
  {
    id: 'princess',
    name: 'Princess Villa',
    khmerName: 'វីឡាព្រីនស៍',
    price: '$285,000 - $320,000',
    size: '12m x 16m (Land: 15m x 22m)',
    bedrooms: 5,
    bathrooms: 6,
    description: 'វីឡាទោលដ៏ប្រណិត សាកសមបំផុតសម្រាប់គ្រួសារស៊ីវីល័យ មានទំហំដីធំទូលាយ ព្រមទាំងសួនច្បារព័ទ្ធជុំវិញ។',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    features: ['បន្ទប់គេងធំៗ ៥', 'កន្លែងចតឡាន ៣', 'បន្ទប់ទទួលភ្ញៀវធំ', 'ផ្ទះបាយទំនើប ២']
  },
  {
    id: 'twin',
    name: 'Twin Villa',
    khmerName: 'វីឡាភ្លោះ',
    price: '$195,000 - $220,000',
    size: '8m x 15m (Land: 10m x 20m)',
    bedrooms: 4,
    bathrooms: 5,
    description: 'វីឡាភ្លោះរចនាម៉ូដបែបអ៊ឺរ៉ុប ទាន់សម័យ បង្កើនភាពឯកជនខ្ពស់ និងសហគមន៍មានសុវត្ថិភាព។',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    features: ['បន្ទប់គេង ៤', 'កន្លែងចតឡាន ២', 'ລະเบียงធំទូលាយ', 'ប្រព័ន្ធសុវត្ថិភាព ២៤ម៉ោង']
  },
  {
    id: 'shophouse',
    name: 'Shophouse (Business Center)',
    khmerName: 'ផ្ទះអាជីវកម្ម',
    price: '$165,000 - $190,000',
    size: '4.5m x 16m (Land: 4.5m x 22m)',
    bedrooms: 4,
    bathrooms: 5,
    description: 'ទីតាំងក្បែរផ្លូវធំ សាកសមបំផុតសម្រាប់បើកអាជីវកម្ម ការិយាល័យ ឬការរស់នៅប្រកបដោយផលចំណេញខ្ពស់។',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    features: ['មុខផ្ទះធំទូលាយ', 'សក្តានុពលពាណិជ្ជកម្មខ្ពស់', 'បន្ទប់ទឹកគ្រប់ជាន់', 'ចំណតយានយន្តងាយស្រួល']
  },
  {
    id: 'king',
    name: 'King Villa',
    khmerName: 'វីឡាឃីង',
    price: '$550,000 - $680,000',
    size: '18m x 20m (Land: 24m x 25m)',
    bedrooms: 6,
    bathrooms: 8,
    description: 'វីឡាព្រះរាជា រចនាប័ទ្មអភិជន កម្រិត VIP បំពាក់ដោយអាងហែលទឹកឯកជន និងការតុបតែងប្រណិតអស្ចារ្យ។',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    features: ['អាងហែលទឹកឯកជន', 'បន្ទប់ទឹកស្ទីម និងសាណា', 'បន្ទប់គេងមេគ្រួសារ VIP', 'ลิฟต์ផ្ទាល់ខ្លួន (Elevator)']
  }
];

export const OBJECTION_PRESETS = [
  'តម្លៃរាងខ្ពស់ជាងគម្រោងជុំវិញបន្តិច',
  'ខ្លាចការសាងសង់មិនទាន់ពេលកំណត់',
  'ចង់ប្រៀបធៀបជាមួយគម្រោងផ្សេងសិន',
  'បារម្ភពីរឿងការប្រាក់ធនាគារ និងលក្ខខណ្ឌកម្ចី',
  'ចង់បានការបញ្ចុះតម្លៃបន្ថែមទៀតសិនទើបសម្រេចចិត្ត'
];
