"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to Sulat-Suri!";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data); // <-- Add this
      if (!res.ok)
        throw new Error(data.error || data.message || "Login failed");

      login(data.user.user, data.user.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="overflow-hidden">
        <div className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 order-1 border rounded-lg shadow-md md:row-span-2 bg-white"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">LOGIN</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your BSU account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
                  placeholder="m@batstate-u.edu.ph"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
              )}
              <Button type="submit" className="w-full bg-purple-700 rounded-lg">
                Login
              </Button>
              <div className="text-center mt-4 text-sm flex flex-col gap-1">
                <span>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-900 hover:underline"
                  >
                    Sign up
                  </Link>
                </span>
                <span>
                  <Link
                    to="/verify-email"
                    className="text-purple-900 hover:underline"
                  >
                    Verify your email
                  </Link>
                </span>
              </div>
            </div>
          </form>
          <div className="relative hidden md:flex md:flex-col-reverse -inset-x-5">
            <img
              src="./src/assets/images/logo.png"
              alt="Image"
              className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale md:scale-90 -inset-y-2"
            />
            <h2 className="text-center pt-80 mt-10 text-xl font-bold text-white">
              Welcome to Sulat-Suri
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
