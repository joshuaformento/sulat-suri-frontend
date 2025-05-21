import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RequestVerification() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Verification email sent! Please check your inbox.");
      } else {
        setStatus("error");
        setMessage(data.error || data.message || "Failed to send verification email.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to send verification email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-950 text-white">
      <div className="bg-white text-purple-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Request Email Verification</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="font-semibold">
            Enter your email address:
          </label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded px-2 py-1 border"
          />
          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Verification Email"}
          </Button>
        </form>
        {message && (
          <div className={`mt-4 text-center ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}