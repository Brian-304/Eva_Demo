export default async function handler(req, res) {
  try {
    // 1. Logs to confirm variables are being read (Check Vercel Logs tab for these!)
    console.log("Checking Environment Variables...");
    console.log("Using Replica ID:", process.env.AVATAR_ID);

    const url = "https://api.tavus.io/v2/conversations";

    // 2. The fix: Key must be 'replica_id'
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

    // 3. Capture the actual response from Tavus
    const data = await response.json();
    console.log("Tavus Response:", data);

    return res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server crashed", details: err.toString() });
  }
}
