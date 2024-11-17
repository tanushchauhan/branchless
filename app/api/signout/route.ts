import { createClient } from "@/utils/supabase/supabase";

export async function GET(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return Response.redirect(new URL("/", request.url));
}