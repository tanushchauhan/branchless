import supabase2 from "@/utils/supabase/supersupabase";

export async function POST(request: Request) {
  const { userId } = await request.json();
  let {data: user, error } = await supabase2.from("users").select("*").eq("id", userId).single();

  if (error) {
    return Response.json({ error: "Error in fetching user" }, {
      status: 500,
    });
  }
  
  console.log(user);
  // TODO this or not?

  return Response.json(user);
}