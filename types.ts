export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  sizes: number[];
  category: 'Running' | 'Lifestyle' | 'Basketball' | 'Custom';
  rating: number;
  reviews: number;
  sales: number; // For analytics
  reviewsList?: Review[]; // List of specific comments
}

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  time: string;
}

export enum ImageSize {
  OneK = '1K',
  TwoK = '2K',
  FourK = '4K'
}

export type ViewState = 'home' | 'shop' | 'product' | 'cart' | 'generator' | 'login' | 'register' | 'admin' | 'about';

// Extend Window interface for AI Studio
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}