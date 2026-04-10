export default async function handler(req, res) {
  try {
    // 1. Logs to confirm variables are being read
    console.log("Using Replica ID:", process.env.AVATAR_ID);

    const url = "https://api.tavus.io/v2/conversations";

    const payload = {
      replica_id: process.env.AVATAR_ID, 
      input: {}
    };

    // 2. Added timeout and explicit error handling
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TAVUS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      // Prevent undici from hanging the connection
      keepalive: false 
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Tavus API Error:", errorText);
        return res.status(response.status).json({ error: "Tavus rejected request", details: errorText });
    }

    const data = await response.json();
    console.log("Tavus Response Success!");
    return res.status(200).json(data);

  } catch (err) {
    console.error("Full Server Error:", err);
    return res.status(500).json({ 
        error: "Server connection failed", 
        details: err.message,
        stack: err.stack 
    });
  }
}
