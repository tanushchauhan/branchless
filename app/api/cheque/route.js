import ollama from "ollama";

export async function POST(request) {
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
  return new Response(JSON.stringify({ response }));
}
