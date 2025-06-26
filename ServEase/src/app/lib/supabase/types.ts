// lib/types.ts

// This is now the single, authoritative definition for a ServiceProvider.
export type ServiceProvider = {
  id: number;
  name: string;
  location: string;
  rating: number;
  image_url: string;
  service_icon_url: string;
  Category: string; // The main category, e.g., 'Personal Care & Beauty'
  'Specific Category': string; // The subcategory, e.g., 'Barbershops'
};