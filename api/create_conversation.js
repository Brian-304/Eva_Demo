export const config = {
  maxDuration: 30, // Extends Vercel's waiting time
};

export default async function handler(req, res) {
  try {
    // 1. Logs to confirm your Environment Variables are loading in Vercel
    console.log("Starting Tavus request...");
    console.log("Using Replica ID:", process.env.AVATAR_ID);

    // 2. The correct Tavus v2 Endpoint
    // api.tavus.io is often deprecated for v2; tavusapi.com is the standard
    const url = "https://tavusapi.com/v2/conversations";

    // 3. The Payload - In v2, the key MUST be 'replica_id'
    const payload = {
      replica_id: "r1aea373d24c"
      conversation_config: {
      max_duration: 120,
      idle_timeout: 60
      }
    };

    console.log("Calling endpoint:", url);

    // 4. The Fetch Request
    // Note: Tavus v2 prefers 'x-api-key' over 'Authorization: Bearer'

    console.log("SENDING PAYLOAD:", JSON.stringify(payload));
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": process.env.TAVUS_API_KEY.trim(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // 5. Check if the connection worked
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Tavus API Error Response:", errorText);
      return res.status(response.status).json({ 
        error: "Tavus rejected the request", 
        details: errorText 
      });
    }

    const data = await response.json();
    console.log("Success! Tavus Data:", data);

    return res.status(200).json(data);

  } catch (err) {
    // This catches the 'ConnectTimeoutError'
    console.error("Critical Connection Error:", err.message);
    return res.status(500).json({ 
      error: "Connection Failed", 
      message: err.message 
    });
  }
}
