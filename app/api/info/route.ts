import supabase from "../supabase";

export async function GET() {
  const { data: user } = await supabase.auth.getUser();

  if (user.user === null) {
    return new Response(JSON.stringify({ error: "Not Logged in!" }), {
      status: 401,
    });
  }

  let { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(userData), {
    status: 200,
  });
}
