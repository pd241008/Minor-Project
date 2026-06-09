const BASE_URL = "http://127.0.0.1:8000";

export async function post(endpoint: string, body: any = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)   // 🔥 REQUIRED
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}