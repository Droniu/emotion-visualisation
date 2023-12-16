export const EMOTIONS = {
  admiration: 'admiration',
  amusement: 'amusement',
  anger: 'anger',
  annoyance: 'annoyance',
  approval: 'approval',
  caring: 'caring',
  confusion: 'confusion',
  curiosity: 'curiosity',
  desire: 'desire',
  disappointment: 'disappointment',
  disapproval: 'disapproval',
  disgust: 'disgust',
  embarrassment: 'embarrassment',
  excitement: 'excitement',
  fear: 'fear',
  gratitude: 'gratitude',
  grief: 'grief',
  joy: 'joy',
  love: 'love',
  nervousness: 'nervousness',
  optimism: 'optimism',
  pride: 'pride',
  realization: 'realization',
  relief: 'relief',
  remorse: 'remorse',
  sadness: 'sadness',
  surprise: 'surprise',
  neutral: 'neutral',
} as const;

export const COLORS = {
  admiration: '#FFD700', // Gold
  amusement: '#FFB6C1', // Light Pink
  anger: '#FF0000', // Red
  annoyance: '#FF4500', // Orange Red
  approval: '#008000', // Green
  caring: '#FFC0CB', // Pink
  confusion: '#D3D3D3', // Light Grey
  curiosity: '#FFFF00', // Yellow
  desire: '#FF1493', // Deep Pink
  disappointment: '#778899', // Light Slate Grey
  disapproval: '#A9A9A9', // Dark Grey
  disgust: '#556B2F', // Dark Olive Green
  embarrassment: '#FF69B4', // Hot Pink
  excitement: '#FFA500', // Orange
  fear: '#800080', // Purple
  gratitude: '#FFD700', // Gold
  grief: '#000000', // Black
  joy: '#FFFACD', // Lemon Chiffon
  love: '#FF69B4', // Hot Pink
  nervousness: '#ADD8E6', // Light Blue
  optimism: '#00FF00', // Lime
  pride: '#8B4513', // Saddle Brown
  realization: '#FF6347', // Tomato
  relief: '#20B2AA', // Light Sea Green
  remorse: '#4682B4', // Steel Blue
  sadness: '#1E90FF', // Dodger Blue
  surprise: '#FFC0CB', // Pink
  neutral: '#f9f1f1', // Offwhite
} as const;

export const RAW_COLORS = [
  [1, 0.843, 0], // Gold
  [1, 0.713, 0.757], // Light Pink
  [1, 0, 0], // Red
  [1, 0.271, 0], // Orange Red
  [0, 0.502, 0], // Green
  [1, 0.753, 0.796], // Pink
  [0.827, 0.827, 0.827], // Light Grey
  [1, 1, 0], // Yellow
  [1, 0.078, 0.576], // Deep Pink
  [0.467, 0.533, 0.6], // Light Slate Grey
  [0.663, 0.663, 0.663], // Dark Grey
  [0.333, 0.42, 0.184], // Dark Olive Green
  [1, 0.412, 0.706], // Hot Pink
  [1, 0.647, 0], // Orange
  [0.502, 0, 0.502], // Purple
  [1, 0.843, 0], // Gold
  [0, 0, 0], // Black
  [1, 0.98, 0.804], // Lemon Chiffon
  [1, 0.412, 0.706], // Hot Pink
  [0.678, 0.847, 0.902], // Light Blue
  [0, 1, 0], // Lime
  [0.545, 0.271, 0.075], // Saddle Brown
  [1, 0.388, 0.278], // Tomato
  [0.125, 0.698, 0.667], // Light Sea Green
  [0.275, 0.51, 0.706], // Steel Blue
  [0.118, 0.565, 1], // Dodger Blue
  [1, 0.753, 0.796], // Pink
  [0.976, 0.945, 0.945], // Offwhite
];

export const BOUNDS = {
  minX: -25,
  maxX: 25,
  minY: -25,
  maxY: 25,
} as const;
