let messages = [];

export async function handler(event) {
  const data = JSON.parse(event.body || "{}");
  if (!data.name || !data.text) {
    return { statusCode: 400, body: "Invalid" };
  }

  messages.push({ name: data.name, text: data.text });
  if (messages.length > 100) messages.shift(); // keep last 100

  return { statusCode: 200, body: "OK" };
}
