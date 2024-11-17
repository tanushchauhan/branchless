import { createClient } from "@/utils/supabase/supabase";

export async function GET() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (user.user === null) {
    return Response.json({ error: "Not Logged in!" }, {
      status: 401,
    });
  }

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if (error) {
    return Response.json({ error }, {
      status: 500,
    });
  }

  return Response.json(userData);
}
