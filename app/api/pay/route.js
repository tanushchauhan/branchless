// receiver - uuid, amount
import { createClient } from "@/utils/supabase/supabase";
import supabase2 from "@/utils/supabase/supersupabase";
export async function POST(request) {
  const supabase = await createClient();

  let { receiver, amount } = await request.json();
  const { data: user } = await supabase.auth.getUser();

  if (amount <= 0) {
    return new Response(JSON.stringify({ message: "Invalid amount" }));
  }

  amount = Math.round(amount * 100) / 100;

  if (user.user === null) {
    return new Response(JSON.stringify({ error: "Not Logged in!" }), {
      status: 401,
    });
  }

  let { data: amtSender, error11 } = await supabase2
    .from("users")
    .select("amount")
    .eq("id", user.user.id);

  let { data: amtReceiver, error22 } = await supabase2
    .from("users")
    .select("amount")
    .eq("id", receiver);

  if (error11 || error22) {
    return new Response(
      JSON.stringify({ message: "Error in fetching user's balance" })
    );
  }

  amtSender = amtSender[0].amount;
  amtReceiver = amtReceiver[0].amount;

  if (amtSender < amount) {
    return new Response(JSON.stringify({ message: "Insufficient balance" }));
  }

  const { error } = await supabase2
    .from("users")
    .update({ amount: amtSender - amount })
    .eq("id", user.user.id);

  if (error) {
    return new Response(
      JSON.stringify({ message: "Error in updating sender's balance", error })
    );
  }

  const { error: error2 } = await supabase2
    .from("users")
    .update({ amount: amtReceiver + amount })
    .eq("id", receiver);

  if (error2) {
    await supabase2
      .from("users")
      .update({ amount: amtSender + amount })
      .eq("id", user.user.id);
    return new Response(
      JSON.stringify(
        { message: "Error in updating receiver's balance" },
        error2
      )
    );
  }

  const { error: error3 } = await supabase2
    .from("transactions")
    .insert([{ sender: user.user.id, receiver, amount, success: true }]);

  if (error3) {
    await supabase2
      .from("users")
      .update({ amount: amtSender + amount })
      .eq("id", user.user.id);
    await supabase2
      .from("users")
      .update({ amount: amtReceiver - amount })
      .eq("id", receiver);
    await supabase2
      .from("transactions")
      .insert([{ sender: user.user.id, receiver, amount, success: false }]);
    return new Response(
      JSON.stringify({ message: "Error in updating transactions" })
    );
  }

  return new Response(JSON.stringify({ message: "Transaction successful" }));
}
