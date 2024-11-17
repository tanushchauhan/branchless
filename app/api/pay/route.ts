// receiver - uuid, amount
import { createClient } from "@/utils/supabase/supabase";
import supabase2 from "@/utils/supabase/supersupabase";
export async function POST(request: Request) {
  const supabase = await createClient();

  let { receiver, amount } = await request.json();
  const { data: user } = await supabase.auth.getUser();

  if (amount <= 0) {
    return new Response(JSON.stringify({ message: "Invalid amount", error: "Invalid amount" }));
  }

  amount = Math.round(amount * 100) / 100;

  if (user.user === null) {
    return new Response(JSON.stringify({ error: "Not Logged in!" }), {
      status: 401,
    });
  }

  const { data: temp, error: error90 } = await supabase2
    .from("users")
    .select("id")
    .eq("account_number", receiver);

  if (error90 || temp.length === 0) {
    return new Response(
      JSON.stringify({ message: "Error in fetching receiver's UUID", error: "Error in fetching receiver's UUID" })
    );
  }

  receiver = temp[0].id;

  const { data: temp3, error: error901 } = await supabase2
    .from("users")
    .select("name")
    .eq("id", receiver);

  if (error901 || temp3.length === 0) {
    return new Response(
      JSON.stringify({ message: "Error in fetching receiver's name", error: "Error in fetching receiver's name" })
    );
  }

  const receiverName = temp3[0].name;

  const { data: temp4, error: error91 } = await supabase2
    .from("users")
    .select("name")
    .eq("id", user.user.id);

  if (error91 || temp4.length === 0) {
    return new Response(
      JSON.stringify({ message: "Error in fetching sender's name", error: "Error in fetching sender's name" })
    );
  }

  const senderName = temp4[0].name;

  let { data: amtSender, error: error11 } = await supabase2
    .from("users")
    .select("amount")
    .eq("id", user.user.id);

  let { data: amtReceiver, error: error22 } = await supabase2
    .from("users")
    .select("amount")
    .eq("id", receiver);

  if (error11 || error22) {
    return new Response(
      JSON.stringify({ message: "Error in fetching user's balance", error: "Error in fetching user's balance" })
    );
  }

  amtSender = amtSender![0].amount;
  amtReceiver = amtReceiver![0].amount;

  if (amtSender! < amount) {
    return new Response(JSON.stringify({ message: "Insufficient balance", error: "Insufficient balance" }));
  }

  const { error } = await supabase2
    .from("users")
    .update({ amount: amtSender as any - amount })
    .eq("id", user.user.id);

  if (error) {
    return new Response(
      JSON.stringify({ message: "Error in updating sender's balance", error: "Error in updating sender's balance" })
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
    return Response.json({ message: "Error in updating receiver's balance", error: "Error in updating receiver's balance" });
  }

  const { error: error3 } = await supabase2.from("transactions").insert([
    {
      sender: user.user.id,
      receiver,
      amount,
      success: true,
      sender_name: senderName,
      receiver_name: receiverName,
    },
  ]);

  if (error3) {
    await supabase2
      .from("users")
      .update({ amount: amtSender + amount })
      .eq("id", user.user.id);
    await supabase2
      .from("users")
      .update({ amount: amtReceiver as any - amount })
      .eq("id", receiver);
    await supabase2
      .from("transactions")
      .insert([
        {
          sender: user.user.id,
          receiver,
          amount,
          success: false,
          sender_name: senderName,
          receiver_name: receiverName,
        },
      ]);
    return new Response(
      JSON.stringify({ message: "Error in updating transactions", error: "Error in updating transactions" })
    );
  }

  return new Response(JSON.stringify({ message: "Transaction successful" }));
}
