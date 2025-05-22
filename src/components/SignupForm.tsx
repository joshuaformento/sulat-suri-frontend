import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sulat-Suri | Sign up";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

   try {
  const response = await fetch("http://localhost:3000/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName: name, email, password, confirmPassword }),
  });

  if (response.status === 409) {
    const data = await response.json();
    throw new Error(data.message || "User already exists.");
  } else if (!response.ok) {
    // Try to parse error message, but handle empty body
    let errorMsg = "Signup failed";
    try {
      const data = await response.json();
      errorMsg = data.message || errorMsg;
    } catch {
      // Ignore if response is not JSON
    }
    throw new Error(errorMsg);
  }

  setSuccess(true);
  setError(null);
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
                <h1 className="text-2xl font-bold">SIGN UP</h1>
                <p className="text-balance text-muted-foreground">
                  Sign up with your BSU email
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="rounded-lg"
                  placeholder="m@batstate-u.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              {success && (
                <p className="text-sm text-green-600 text-center">
                  Signup successful! Please check your email to verify your account.
                </p>
              )}

              <Button type="submit" className="w-full bg-purple-700 rounded-lg">
                Sign Up
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline underline-offset-4 text-blue-600"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </form>

          <div className="relative hidden md:flex md:flex-col items-center justify-center row-span-2 -inset-x-5">
            <img
              src="./src/assets/images/logo.png"
              alt="Image"
              className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale md:scale-90 inset-y-16"
            />
            <h2 className="text-center pt-80 mt-10 text-xl font-bold text-white">
              Join Sulat-Suri Today
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
