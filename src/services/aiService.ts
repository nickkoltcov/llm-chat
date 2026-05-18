export default async function askAI(messages: { role: string; content: string }[]) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    
    return data.reply;

  } catch (error) {
    console.error("Ошибка:", error);
    return "Произошла ошибка при получении ответа от ИИ. Попробуйте позже.";
  }
}