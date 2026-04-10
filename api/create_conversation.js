export default async function handler(req, res) {
  try {
    const url = "https://api.tavus.io/v2/conversations";

    const payload = {
      avatar_id: process.env.AVATAR_ID,
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

    const text = await response.text();   // read raw text
    console.log("Tavus raw response:", text);

    let data;
    try {
      data = JSON.parse(text);            // try to parse JSON
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON returned from Tavus",
        raw: text
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server crashed", details: err.toString() });
  }
}
