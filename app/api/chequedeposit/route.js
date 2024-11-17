import { createClient } from "@/utils/supabase/supabase";
import supabase2 from "@/utils/supabase/supersupabase";

export async function GET() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (user.user === null) {
    return Response.json(
      { error: "Not Logged in!" },
      {
        status: 401,
      }
    );
  }

  let { name, amount } = await request.json();

  const UUID = "0cad46c7-8e27-4e50-9bed-73232744483b";

  const { data: temp3, error: error901 } = await supabase2
    .from("users")
    .select("name")
    .eq("id", user.user.id);

  if (error901 || temp3.length === 0) {
    return new Response(
      JSON.stringify({
        message: "Error in fetching receiver's name",
        error: "Error in fetching receiver's name",
      })
    );
  }

  const receiverName = temp3[0].name;

  const { error: error3 } = await supabase2.from("transactions").insert([
    {
      sender: UUID,
      receiver: user.user.id,
      amount,
      success: true,
      sender_name: name,
      receiver_name: receiverName,
    },
  ]);

  if (error3) {
    return Response.json(
      { error: error3.message },
      {
        status: 500,
      }
    );
  }

  let { data: amtReceiver, error: error22 } = await supabase2
    .from("users")
    .select("amount")
    .eq("id", user.user.id);

  if (error22 || amtReceiver.length === 0) {
    return new Response(
      JSON.stringify({
        message: "Error in fetching receiver's amount",
        error: "Error in fetching receiver's amount",
      })
    );
  }

  const { error } = await supabase2
    .from("users")
    .update({ amount: amtReceiver + amount })
    .eq("id", user.user.id);

  if (error) {
    return Response.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }

  return Response.json(
    { message: "Transaction Successful" },
    {
      status: 200,
    }
  );
}
