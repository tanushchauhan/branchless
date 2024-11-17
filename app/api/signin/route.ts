import supabase from "../supabase";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, {
      status: 400,
    });
  }

  return Response.json({ message: "success" });
}
