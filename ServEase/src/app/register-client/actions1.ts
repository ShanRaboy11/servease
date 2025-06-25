'use server';

import { redirect } from 'next/navigation';
import { type SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/server';

export async function clientLoginCredentials(formData: FormData): Promise<void> {
  console.log("--- SIGNUP SERVER ACTION RUNNING ---");
  
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return redirect('/your-signup-page-url?message=Email and password are required.');
  }
  if (password.length < 8) {
    return redirect('/your-signup-page-url?message=Password must be at least 8 characters.');
  }

  const credentials: SignUpWithPasswordCredentials = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.error('--- SUPABASE SIGNUP ERROR ---', error.message);
    return redirect(`/your-signup-page-url?message=Could not create account. ${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    console.log('User created. User ID: ', data.user.id);
    const { data: { user: sessionUser }} = await supabase.auth.getUser();
    console.log("Session user id: ", sessionUser?.id);
  }


  console.log("SUCCESS! User account created. Redirecting to profile setup.");
}

export async function getClientData() {
  const supabase = await createClient();

  // 1. Get the currently authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // No user is logged in, so there's no data to fetch.
    return null;
  }
  
  // 2. Fetch the profile data from your `clients` table using the user's ID.
  //    IMPORTANT: Change 'clients' to your actual table name if it's different.
  const { data: clientProfile, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is ok.
    console.error("Error fetching client profile:", error);
    return { email: user.email }; // Return at least the email
  }
  
  // 3. Combine auth email with profile data and return it.
  return {
    ...clientProfile, // This will contain data for steps 2 and 3
    email: user.email, // This is the email from step 1
  };
}

export async function abandonAndDeleteRegistration() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log("No user session found to delete.");
    return;
  }
  
  // Use the admin client to bypass RLS if needed, but the simple policy should work.
  // Using admin client is safer as it guarantees deletion regardless of policies.
  const supabaseAdmin = await createClient();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    console.error("Error deleting user during abandonment:", error.message);
  } else {
    console.log(`Successfully deleted abandoned registration for user: ${user.id}`);
  }
}

/**
 * Signs out the currently authenticated user.
 * This is called ONLY on successful completion.
 */
export async function signOutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  console.log("User signed out successfully.");
}