"use client";

import { useState, useEffect, useRef } from "react";

function getRandomUsername() {
  const adjectives = ["Cool", "Happy", "Silly", "Bright", "Crazy", "Swift", "Brave"];
  const animals = ["Tiger", "Panda", "Elephant", "Falcon", "Lion", "Dolphin", "Wolf"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 10000);
  return `${adj}${animal}${number}`;
}

export default function Page() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<{user: string; text: string}[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsername(getRandomUsername());
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { user: username, text: input.trim() }]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Simple Chat</h1>
      <p>Your username: <strong>{username}</strong></p>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: 300,
          overflowY: "auto",
          marginBottom: "1rem",
          backgroundColor: "#f9f9f9",
          borderRadius: 5,
        }}
      >
        {messages.length === 0 && <p style={{ color: "#666" }}>No messages yet</p>}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <strong>{msg.user}</strong>: {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <input
        type="text"
        placeholder="Type your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: "80%", padding: "0.5rem", fontSize: 16 }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "0.5rem 1rem",
          marginLeft: "0.5rem",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </main>
  );
}
