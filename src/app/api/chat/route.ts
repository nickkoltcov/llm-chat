import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const completion = await client.chat.completions.create({
    model: "openrouter/free",
    messages: messages
  });

  return Response.json({
    reply: completion.choices[0].message.content
  });
}
