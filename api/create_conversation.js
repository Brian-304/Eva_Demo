export default async function handler(req, res) {
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

  const data = await response.json();
  res.status(200).json(data);
}
