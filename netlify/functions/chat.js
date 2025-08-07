let messages = [];

export async function handler(event) {
  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body || "{}");
    if (!data.name || !data.text) return { statusCode: 400, body: "Invalid" };
    messages.push({ name: data.name, text: data.text });
    if (messages.length > 100) messages.shift();
    return { statusCode: 200, body: "OK" };
  } else if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messages),
    };
  } else {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
}
