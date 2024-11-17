import { writeFile, mkdir, unlink, rmdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";
import { createClient } from "@/utils/supabase/supabase";
import supabase2 from "@/utils/supabase/supersupabase";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dirPath = "./files";
  const filePath = `${dirPath}/${file.name}`;
  await mkdir(dirPath, { recursive: true });
  await writeFile(filePath, buffer);

  const response = await ollama.chat({
    model: "llama3.2-vision",
    messages: [
      {
        role: "user",
        content: `From this cheque image, please provide the sender's name, the amount, the date, and the cheque number. Present this information in JSON format, using a single key called "data" that contains four subkeys: "name," "amount," "date," and "cheque_number." Ensure that you provide only the JSON and nothing else. Make sure to look at the cheque image and get data from there.`,
        images: [filePath],
      },
    ],
  });

  const res = response.message.content;

  let parsedData;
  try {
    parsedData = JSON.parse(res);
  } catch {
    return Response.json(
      { error: "Failed to parse JSON" },
      {
        status: 401,
      }
    );
  }

  console.log(parsedData.data);

  await unlink(filePath);
  await rmdir(dirPath, { recursive: true });

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

  const name = parsedData.data.name;
  const amount = parsedData.data.amount;

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

  if (error22 || !amtReceiver || amtReceiver.length === 0) {
    return new Response(
      JSON.stringify({
        message: "Error in fetching receiver's amount",
        error: "Error in fetching receiver's amount",
      })
    );
  }

  amtReceiver = amtReceiver[0].amount;

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
