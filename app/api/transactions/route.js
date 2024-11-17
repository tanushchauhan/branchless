import supabase2 from "@/utils/supabase/supersupabase";
import { createClient } from "@/utils/supabase/supabase";

export async function GET() {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    return new Response(JSON.stringify({ error: "Not Logged in!" }), {
      status: 401,
    });
  }

  let { data: transactions, error2 } = await supabase2
    .from("transactions")
    .select("*")
    .or(`sender.eq.${user.user.id},receiver.eq.${user.user.id}`);

  if (error2) {
    return new Response(
      JSON.stringify(
        { error: "Error in fetching transactions" },
        {
          status: 500,
        }
      )
    );
  }

  return new Response(JSON.stringify(transactions), {
    status: 200,
  });
}
