import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:3000/api/v1/auth/verify-email/${token}`)
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setStatus("success");
            setMessage(data.message || "Email verified successfully!");
          } else {
            setStatus("error");
            setMessage(data.error || data.message || "Verification failed.");
          }
        })
        .catch(() => {
          setStatus("error");
          setMessage("Verification failed. Please try again.");
        });
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-950 text-white">
      <div className="bg-white text-purple-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        {status === "verifying" && <p>Verifying your email...</p>}
        {status === "success" && (
          <>
            <p className="text-green-600 mb-4">{message}</p>
            <Button className="w-full" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-red-600 mb-4">{message}</p>
            <Button className="w-full" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
            <Link to="/verify-email" className="text-purple-300 hover:underline">
              Verify your email
            </Link>
          </>
        )}
      </div>
    </div>
  );
}