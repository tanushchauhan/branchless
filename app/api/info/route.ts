import supabase from "../supabase";

export async function GET() {
  const { data: user } = await supabase.auth.getUser();
  console.log(user);

  if (user.user === null) {
    return Response.json({ error: "Not Logged in!" }, {
      status: 401,
    });
  }

  let { data: userData, error } = await supabase
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
