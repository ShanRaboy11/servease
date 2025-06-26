// app/category/[specific_category]/page.tsx

import SpecificCategoryClient from './specific-category';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import styles from '../styles/specific-category.module.css';

// The page now receives `params` with the specific category
export default async function SpecificCategoryPage({ params }: { params: { specific_category: string } }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Get the slug from the URL (e.g., 'Barbershops')
  // We decode it to handle potential spaces or special characters in the URL
  const specificCategory = decodeURIComponent(params.specific_category);

  // Define the type for the data
  type ServiceProvider = {
    id: number;
    name: string;
    location: string;
    rating: number;
    image_url: string;
    service_icon_url: string;
    Category: string;
    'Specific Category': string;
  };

  let initialProviders: ServiceProvider[] = [];
  let fetchError: string | null = null;
  let categoryName = "Services"; // Default title

  try {
    // Perform the initial data fetch using the exact column name
    const { data, error } = await supabase
      .from('service_providers')
      .select('*')
      .eq('specific_category', specificCategory);

    if (error) throw error;
    
    initialProviders = data || [];
    // Set the page title from the first result's main category, if available
    if (initialProviders.length > 0) {
      categoryName = initialProviders[0].Category;
    }

  } catch (error: any) {
    console.error("Database Fetch Error:", error.message);
    fetchError = "Could not load services at this time. Please try again later.";
  }

  if (fetchError) {
    return <div className={styles.statusMessage}>{fetchError}</div>;
  }
  
  // Pass the fetched data and the category name to the client
  return (
    <SpecificCategoryClient
      initialProviders={initialProviders}
      categoryName={categoryName}
      specificCategory={specificCategory}
    />
  );
}