import { createClient } from "../utils/supabase/server";
import { NextResponse } from 'next/server';

// This API route is a target for navigator.sendBeacon
export async function POST() {
  console.log("Beacon API received request to abandon registration.");
  
  // The logic is identical to the server action
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const supabaseAdmin = await createClient();
    await supabaseAdmin.auth.admin.deleteUser(user.id);
    console.log(`Beacon triggered deletion for user: ${user.id}`);
  }

  return NextResponse.json({ success: true });
}