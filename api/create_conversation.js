export default async function handler(req, res) {
  try {
    // 1. Check if variables exist
    if (!process.env.TAVUS_API_KEY || !process.env.AVATAR_ID) {
      return res.status(500).json({ error: "Missing Environment Variables in Vercel Settings" });
    }

    const url = "https://api.tavus.io/v2/conversations";

    // 2. Use 'replica_id' instead of 'avatar_id'
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
    return res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server crashed", details: err.toString() });
  }
}
