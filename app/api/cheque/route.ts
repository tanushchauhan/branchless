import ollama from "ollama";

export async function POST(request: Request) {
  const response = await ollama.chat({
    model: "llama3.2-vision",
    messages: [
      {
        role: "user",
        content: "What is in this image?",
        images: ["image.jpg"],
      },
    ],
  });
  return Response.json({ response });
}
