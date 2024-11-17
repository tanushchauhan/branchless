import { writeFile, mkdir, unlink, rmdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

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
    return NextResponse.json({ success: false, error: "Failed to parse JSON" });
  }

  console.log(parsedData);

  await unlink(filePath);
  await rmdir(dirPath);

  return NextResponse.json({ success: true, data: parsedData });
}
