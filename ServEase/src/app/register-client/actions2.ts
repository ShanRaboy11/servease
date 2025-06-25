'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server'; // akoang giadd bag-o


interface ProfileData {
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  middle_name?: string;
  gender?: string;
}

export async function profile(formData: FormData): Promise<void> {
  console.log("--- PROFILE SERVER ACTION RUNNING ---");

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated. Cannot create profile.");
    const { data: { user: sessionUser } } = await supabase.auth.getUser();
    console.error("Session user: ", sessionUser?.id);
  }
  console.log("Authenticated user found:", user.id);

  const formObject = Object.fromEntries(formData.entries());
  
  // 2. Extract form data
  const firstName = formObject.first_name as string;
  const lastName = formObject.last_name as string;
  const middleName = formObject.middle_name as string;
  const gender = formObject.gender as string;
  const birthMonth = formObject.birth_month as string;
  const birthDay = formObject.birth_day as string;
  const birthYear = formObject.birth_year as string;

  // 3. Validate form data
  if (!firstName?.trim() || !lastName?.trim() || !birthDay || !birthMonth || !birthYear) {
    console.log("VALIDATION FAILED: Required profile fields missing.");
    return redirect('/register-client?error=missing_fields');
  }

  const monthMap: { [key: string]: string } = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04', 
    'May': '05', 'June': '06', 'July': '07', 'August': '08', 
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  const monthNumber = monthMap[birthMonth];

  if (!monthNumber) {
    console.error("Invalid month value received:", birthMonth);
    return redirect('/register-client?error=invalid_month');
  }

  const formattedDay = String(birthDay).padStart(2, '0');
  const birthDate = `${birthYear}-${monthNumber}-${formattedDay}`;

  const profileData: ProfileData = {
    user_id: user.id,
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    birth_date: birthDate,
  };

  if (middleName?.trim()) profileData.middle_name = middleName.trim();
  if (gender?.trim()) profileData.gender = gender.trim();
  
  console.log("Data to insert:", profileData);
  

  const { error } = await supabase
    .from('client_initial_profile')
    .insert(profileData);

  if (error) {
    console.error('--- SUPABASE PROFILE INSERT ERROR ---', error);
    return redirect(`/register-client?error=database_error&code=${error.code}`);
  }

  console.log("SUCCESS! Profile created for user:", user.id);
}