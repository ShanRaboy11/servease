import SpecificCategoryClient from './specific-category'; 
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import styles from '../styles/specific-category.module.css';
import type { ServiceProvider } from '../lib/supabase/types'; 

interface PageProps {
  params: {
    specific_category: string;
  };
}

export default async function SpecificCategoryPage({ params }: PageProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  const specificCategory = decodeURIComponent(params.specific_category);

  // 2. REMOVE THE LOCAL TYPE DEFINITION - We now import it.
  
  let initialProviders: ServiceProvider[] = [];
  let fetchError: string | null = null;
  let categoryName = "Services";

  try {
    // 3. FIX THE SUPABASE QUERY to use the correct column name with a space
    const { data, error } = await supabase
      .from('service_providers')
      .select('*')
      .eq('specific_category', specificCategory); // <-- FIXED

    if (error) throw error;
    
    initialProviders = data || [];

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
  
  // This will now work without errors because both files use the same imported type.
  return (
    <SpecificCategoryClient
      initialProviders={initialProviders}
      categoryName={categoryName}
      specificCategory={specificCategory}
    />
  );
}