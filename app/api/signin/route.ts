import supabase from "../supabase";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, {
      status: 400,
    });
  }

  console.log(user);

  return Response.json({ message: "success" });
}
