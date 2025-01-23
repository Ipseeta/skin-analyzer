export interface SkinConcern {
  id: string;
  name: string;
  selected: boolean;
}

export interface SkinMetric {
  name: string;
  score: number;
}

export interface SkinAnalysis {
  overallScore: number;
  metrics: SkinMetric[];
}

export interface ProductDetails {
  benefits: string[]
  ingredients: string[]
  howToUse: string[]
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  concerns: string[];
  details?: ProductDetails;
  amazonUrl?: string;
}

export interface SkinMetrics {
  darkCircles: number;
  smoothness: number;
  unevenSkintone: number;
  radiance: number;
  skinShine: number;
  hyperpigmentation: number;
  melasma: number;
  eyebags: number;
  redness: number;
  texture: number;
  wrinkles: number;
  skinSagging: number;
  darkSpots: number;
  freckles: number;
}

export interface QuestionnaireResponse {
  skinType: 'oily' | 'dry' | 'combination' | 'normal'
  sensitivity: 'high' | 'medium' | 'low'
  concerns: string[]
  allergies: string[]
  lifestyle: {
    sunExposure: 'high' | 'medium' | 'low'
    stress: 'high' | 'medium' | 'low'
    sleep: 'good' | 'fair' | 'poor'
    diet: 'balanced' | 'needs-improvement'
  }
}

export interface SkinAnalysisResponse {
  metrics: SkinMetrics;
  overallScore: number;
  questionnaire?: QuestionnaireResponse;
} 