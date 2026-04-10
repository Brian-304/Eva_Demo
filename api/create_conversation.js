export default async function handler(req, res) {
  try {
    // 1. Verification Logs (Visible in Vercel Dashboard)
    console.log("Attempting Tavus connection...");
    console.log("Replica ID used:", process.env.AVATAR_ID);

    const url = "https://api.tavus.io/v2/conversations";

    // 2. The Payload (Using 'replica_id' as required by Tavus v2)
    const payload = {
      replica_id: process.env.AVATAR_ID,
      input: {}
    };

    // 3. The Request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TAVUS_API_KEY.trim()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      // Helps prevent the 'undici' timeout error in Node.js
      keepalive: false 
    });

    // 4. Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Tavus API rejected request:", errorData);
      return res.status(response.status).json({ 
        error: "Tavus API Error", 
        details: errorData 
      });
    }

    const data = await response.json();
    console.log("Tavus Success! Data received.");
    
    return res.status(200).json(data);

  } catch (err) {
    console.error("Connection Failed:", err.message);
    return res.status(500).json({ 
      error: "Server Connection Timeout", 
      message: err.message 
    });
  }
}
