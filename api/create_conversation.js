export const config = {
  maxDuration: 30, // Increases the time Vercel waits before giving up
};

export default async function handler(req, res) {
  try {
    // 1. Logs to confirm Vercel is reading your environment variables
    console.log("Checking Environment Variables...");
    console.log("Replica ID used:", process.env.AVATAR_ID);

    // 2. The correct Tavus v2 Endpoint
    // Note: 'tavusapi.com' is the current domain for v2 requests
    const url = "https://tavusapi.com/v2/conversations";

    // 3. The Payload - Key must be 'replica_id'
    const payload = {
      replica_id: process.env.AVATAR_ID,
      input: {}
    };

    console.log("Attempting fetch to:", url);

    // 4. The Request - Using 'x-api-key' instead of 'Authorization'
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": process.env.TAVUS_API_KEY.trim(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // 5. Handle responses that aren't successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Tavus API responded with an error:", errorText);
      return res.status(response.status).json({ 
        error: "Tavus API Error", 
        details: errorText 
      });
    }

    const data = await response.json();
    console.log("Tavus Success! Conversation created.");

    // 6. Return the data to your index.html
    return res.status(200).json(data);

  } catch (err) {
    // This catches the 'ConnectTimeoutError'
    console.error("Connection Failed:", err.message);
    return res.status(500).json({ 
      error: "Connection Failed", 
      message: err.message 
    });
  }
}
