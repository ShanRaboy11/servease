// app/category/[specific_category]/actions.ts

'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import type { ServiceProvider } from '../../lib/supabase/types'; // Adjust path if needed

/**
 * Fetches providers based on the 'specific_category' column.
 * This function now explicitly promises to return the SHARED ServiceProvider type.
 */
export async function getProvidersBySpecificCategory(specificCategory: string): Promise<{
  providers: ServiceProvider[]; // <-- This now uses the imported, correct type
  error: string | null;
}> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    // 2. REMOVE any local 'type ServiceProvider = { ... }' definition from this file.

    let query = supabase.from('service_providers').select('*');

    // Using the confirmed lowercase_with_underscore column name
    query = query.eq('specific_category', specificCategory);

    const { data, error } = await query;
    if (error) throw error;

    revalidatePath(`/category/${specificCategory}`);

    // The 'data' returned from Supabase will now be correctly typed
    // and match what the client component expects.
    return { providers: data || [], error: null };
  } catch (error: any) {
    console.error("Server Action Error:", error.message);
    return {
      providers: [],
      error: "Failed to fetch services for this category.",
    };
  }
}