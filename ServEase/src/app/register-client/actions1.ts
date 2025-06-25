'use server';

import { redirect } from 'next/navigation';
import { type SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/server';

export async function clientLoginCredentials(formData: FormData): Promise<{ success: boolean; error?: string }> {
  console.log("--- SIGNUP SERVER ACTION RUNNING ---");
  
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }
  if (password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters.' };
  }

  const credentials: SignUpWithPasswordCredentials = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.error('--- SUPABASE SIGNUP ERROR ---', error.message);
    return { success: false, error: `Could not create account: ${error.message}` };
  }

  if (data.user) {
    console.log('User created. User ID: ', data.user.id);
    const { data: { user: sessionUser }} = await supabase.auth.getUser();
    console.log("Session user id: ", sessionUser?.id);
  }


  console.log("SUCCESS! User account created. Redirecting to profile setup.");
  return { success: true };
}