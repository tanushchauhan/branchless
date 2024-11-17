import { createClient } from "@/utils/supabase/supabase";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { email, password } = await req.json();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json(
      { error: error.message },
      {
        status: 400,
      }
    );
  }

  return Response.json({ message: "success" });
}
