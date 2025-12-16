import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Velocity Runner X1',
    brand: 'Kenya-Amazon',
    price: 145.00,
    originalPrice: 180.00,
    description: 'Engineered for speed, the Velocity Runner X1 features our proprietary foam technology for maximum energy return. The breathable mesh upper keeps you cool during intense runs.',
    image: 'https://picsum.photos/seed/sneaker1/800/800',
    sizes: [7, 8, 9, 10, 11, 12],
    category: 'Running',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Street Legend High',
    brand: 'Kenya-Amazon',
    price: 120.00,
    description: 'A modern take on a classic silhouette. The Street Legend High combines premium leather with urban aesthetics. Perfect for daily wear.',
    image: 'https://picsum.photos/seed/sneaker2/800/800',
    sizes: [6, 7, 8, 9, 10, 11],
    category: 'Lifestyle',
    rating: 4.5,
    reviews: 89
  },
  {
    id: '3',
    name: 'Court Master Pro',
    brand: 'Kenya-Amazon',
    price: 160.00,
    description: 'Dominate the court with superior grip and ankle support. The Court Master Pro is designed for explosive movements and hard landings.',
    image: 'https://picsum.photos/seed/sneaker3/800/800',
    sizes: [8, 9, 10, 11, 12, 13, 14],
    category: 'Basketball',
    rating: 4.9,
    reviews: 210
  },
  {
    id: '4',
    name: 'Urban Drift Low',
    brand: 'Kenya-Amazon',
    price: 95.00,
    originalPrice: 110.00,
    description: 'Minimalist design meets maximum comfort. The Urban Drift Low is your go-to shoe for exploring the city.',
    image: 'https://picsum.photos/seed/sneaker4/800/800',
    sizes: [7, 8, 9, 10, 11],
    category: 'Lifestyle',
    rating: 4.2,
    reviews: 56
  },
  {
    id: '5',
    name: 'Marathon Elite',
    brand: 'Kenya-Amazon',
    price: 220.00,
    description: 'For the serious long-distance runner. Carbon plate technology and ultra-lightweight materials.',
    image: 'https://picsum.photos/seed/sneaker5/800/800',
    sizes: [7, 8, 9, 10, 11, 12],
    category: 'Running',
    rating: 5.0,
    reviews: 42
  },
  {
    id: '6',
    name: 'Dunk King Retro',
    brand: 'Kenya-Amazon',
    price: 135.00,
    description: 'Throwback vibes with modern durability. The Dunk King Retro brings 90s style to today\'s streets.',
    image: 'https://picsum.photos/seed/sneaker6/800/800',
    sizes: [8, 9, 10, 11, 12],
    category: 'Basketball',
    rating: 4.6,
    reviews: 175
  }
];