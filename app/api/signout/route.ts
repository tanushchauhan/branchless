import { createClient } from "@/utils/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url));
}