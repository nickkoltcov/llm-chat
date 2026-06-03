import OpenAI from "openai";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");
  const userApiKey = process.env.OPENROUTER_PROVISIONING_KEY

  if (!userApiKey) {
    return Response.json(
      { error: "Unauthorized. Please provide an OpenRouter API key." },
      { status: 401 },
    );
  }

  const client = new OpenAI({
    apiKey: userApiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });

  try {
    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: messages,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Something went wrong" },
      { status: error.status || 500 },
    );
  }
}
