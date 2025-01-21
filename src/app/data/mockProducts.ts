import { Product } from '../types'

export const mockProducts: Product[] = [
  {
    id: 'B0B8ZG6SCF',
    name: 'TruSkin Vitamin C Serum',
    description: 'Advanced antioxidant serum with Vitamin C, E & Hyaluronic Acid',
    imageUrl: '/products/vitamin-c.jpg',
    price: 19.99,
    category: 'Serums',
    concerns: ['hyperpigmentation', 'dark spots', 'dullness'],
    details: {
      benefits: [
        'Brightens skin tone',
        'Reduces dark spots',
        'Boosts collagen production',
      ],
      ingredients: [
        'Vitamin C',
        'Vitamin E',
        'Hyaluronic Acid',
      ],
      howToUse: [
        'Apply in the morning after cleansing',
        'Follow with moisturizer and sunscreen',
        'Store in a cool, dark place',
      ],
    },
  },
  {
    id: 'B01NCWC8PA',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    description: 'High-strength vitamin and mineral blemish formula',
    imageUrl: '/products/niacinamide.jpg',
    price: 5.90,
    category: 'Serums',
    concerns: ['acne', 'oily skin', 'large pores'],
    details: {
      benefits: [
        'Reduces appearance of blemishes',
        'Balances visible sebum activity',
        'Minimizes pore appearance',
      ],
      ingredients: [
        'Niacinamide (10%)',
        'Zinc PCA (1%)',
        'Glycerin',
      ],
      howToUse: [
        'Apply a few drops morning and evening',
        'Use before heavier creams',
        'Can be mixed with other treatments',
      ],
    },
  },
  {
    id: 'B00TTD9BRC',
    name: 'CeraVe Moisturizing Cream',
    description: 'Daily face and body moisturizer for dry skin',
    imageUrl: '/products/cerave.jpg',
    price: 16.99,
    category: 'Moisturizers',
    concerns: ['dry skin', 'sensitive skin', 'barrier repair'],
    details: {
      benefits: [
        'Provides 24-hour hydration',
        'Restores protective skin barrier',
        'Non-comedogenic',
      ],
      ingredients: [
        'Ceramides 1, 3, 6-II',
        'Hyaluronic Acid',
        'MVE Technology',
      ],
      howToUse: [
        'Apply liberally as needed',
        'Can be used face and body',
        'Ideal for daily use',
      ],
    },
  },
  {
    id: 'B07W6G8T9L',
    name: 'Paula\'s Choice 2% BHA Liquid Exfoliant',
    description: 'Leave-on exfoliant for unclogging pores',
    imageUrl: '/products/bha.jpg',
    price: 32.00,
    category: 'Exfoliants',
    concerns: ['blackheads', 'enlarged pores', 'uneven skin tone'],
    details: {
      benefits: [
        'Unclogs and diminishes enlarged pores',
        'Exfoliates dead skin cells',
        'Smooths wrinkles',
      ],
      ingredients: [
        'Salicylic Acid (2%)',
        'Green Tea Extract',
        'Methylpropanediol',
      ],
      howToUse: [
        'Apply once or twice daily after cleansing',
        'Apply with cotton pad',
        'Follow with moisturizer',
      ],
    },
  },
  {
    id: 'B07RN22L33',
    name: 'La Roche-Posay Cicaplast Baume B5',
    description: 'Multi-purpose soothing balm',
    imageUrl: '/products/cicaplast.jpg',
    price: 14.99,
    category: 'Treatments',
    concerns: ['irritated skin', 'dry skin', 'sensitive skin'],
    details: {
      benefits: [
        'Soothes dry, rough skin',
        'Provides barrier repair',
        'Multi-purpose healing',
      ],
      ingredients: [
        'Panthenol (5%)',
        'Madecassoside',
        'Shea Butter',
      ],
      howToUse: [
        'Apply twice daily to affected areas',
        'Can be used on face and body',
        'Ideal for sensitive skin',
      ],
    },
  },
  {
    id: 'B00Q1SGCTA',
    name: 'Neutrogena Hydro Boost Water Gel',
    description: 'Oil-free water-gel moisturizer with hyaluronic acid',
    imageUrl: '/products/hydro-boost.jpg',
    price: 18.97,
    category: 'Moisturizers',
    concerns: ['dry skin', 'dehydration', 'dullness'],
    details: {
      benefits: [
        'Instant hydration',
        'Oil-free formula',
        'Lightweight feel',
      ],
      ingredients: [
        'Hyaluronic Acid',
        'Glycerin',
        'Dimethicone',
      ],
      howToUse: [
        'Apply twice daily to clean skin',
        'Can be used under makeup',
        'Perfect for morning routine',
      ],
    },
  },
  {
    id: 'B01N9SPQHQ',
    name: 'The Ordinary AHA 30% + BHA 2% Peeling Solution',
    description: 'Professional-strength exfoliating treatment',
    imageUrl: '/products/aha-bha.jpg',
    price: 7.90,
    category: 'Treatments',
    concerns: ['texture', 'acne', 'hyperpigmentation'],
    details: {
      benefits: [
        'Deep exfoliation',
        'Improves skin texture',
        'Reduces blemishes',
      ],
      ingredients: [
        'Glycolic Acid',
        'Salicylic Acid',
        'Tasmanian Pepperberry',
      ],
      howToUse: [
        'Use once a week maximum',
        'Apply for no more than 10 minutes',
        'Always use sunscreen after',
      ],
    },
  }
] 