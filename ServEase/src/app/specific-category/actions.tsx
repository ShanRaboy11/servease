// app/category/[specific_category]/actions.ts

'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Your type should match the columns in your Supabase table
type ServiceProvider = {
  id: number;
  name: string;
  location: string;
  rating: number;
  image_url: string;
  service_icon_url: string;
  Category: string; // e.g., 'Personal Care & Beauty'
  'Specific Category': string; // e.g., 'Barbershops'
};

/**
 * Fetches providers based on the 'Specific Category' column.
 * @param specificCategory - The value to match in the 'Specific Category' column.
 */
export async function getProvidersBySpecificCategory(specificCategory: string): Promise<{
  providers: ServiceProvider[];
  error: string | null;
}> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    let query = supabase.from('service_providers').select('*');

    // Filter by the 'Specific Category' column.
    // Use the exact column name from your database, including spaces.
    query = query.eq('Specific Category', specificCategory);

    const { data, error } = await query;
    if (error) throw error;

    // We can revalidate the path to ensure data is fresh on navigation
    revalidatePath(`/category/${specificCategory}`);

    return { providers: data || [], error: null };
  } catch (error: any) {
    console.error("Server Action Error:", error.message);
    return {
      providers: [],
      error: "Failed to fetch services for this category.",
    };
  }
}