export default async function handler(req, res) {
  try {
    // 1. Log to Vercel logs so we can verify the keys are loading
    console.log("Checking Environment Variables...");
    console.log("API KEY exists:", !!process.env.TAVUS_API_KEY);
    console.log("AVATAR ID exists:", !!process.env.AVATAR_ID);

    const url = "https://api.tavus.io/v2/conversations";

    // 2. IMPORTANT: Key must be 'replica_id' for Tavus v2
    const payload = {
      replica_id: process.env.AVATAR_ID, 
      input: {}
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TAVUS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    // 3. Log the response from Tavus to the Vercel dashboard
    console.log("Tavus Response:", data);

    return res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server crashed", details: err.toString() });
  }
}
