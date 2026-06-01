export default async function askAI(
  messages: { role: string; content: any }[],
) {
  try {
    const storedKey =
      typeof window !== "undefined" ? localStorage.getItem("appKey") : null;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(storedKey && { Authorization: `Bearer ${storedKey}` }),
      },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Server error: ${res.status}`);
    }

    return data.reply;
  } catch (error: any) {
    console.error("Ошибка в askAI:", error);

    throw new Error(
      error.message ||
        "Произошла ошибка при получении ответа от ИИ. Попробуйте позже.",
    );
  }
}
