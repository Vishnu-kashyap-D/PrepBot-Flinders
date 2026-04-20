export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: "Method Not Allowed" } });
  }

  // Automatically securely injects the Vercel Environment Variable
  const apiKey = process.env.GROQ_API_KEY; 

  if (!apiKey) {
    return res.status(500).json({ error: { message: "Server Configuration Error: Missing API Key" } });
  }

  // Extract the conversation messages sent from the frontend
  const { messages } = req.body;

  try {
    const rawResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await rawResponse.json();

    if (!rawResponse.ok) {
      return res.status(rawResponse.status).json({ error: data.error || { message: "Groq API Error" } });
    }

    // Pass the successful response back to the frontend
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}