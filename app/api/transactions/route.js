// receiver - uuid, amount

export async function POST(request) {
  const supabase = await createClient();
  const { receiver, amount } = await request.json();
  const { data: user } = await supabase.auth.getUser();

  console.log(user);

  if (user.user === null) {
    return new Response(JSON.stringify({ error: "Not Logged in!" }), {
      status: 401,
    });
  }

  const amtSender = await supabase2
    .from("users")
    .select("amount")
    .eq("id", user.user.id);
  const amtReceiver = await supabase2
    .from("users")
    .select("amount")
    .eq("id", receiver);

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
      JSON.stringify({ message: "Error in updating receiver's balance" })
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
