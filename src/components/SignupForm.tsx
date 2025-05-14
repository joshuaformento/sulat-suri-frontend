import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="overflow-hidden">
        <div className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 order-1 border rounded-lg shadow-md md:row-span-2 bg-white">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">SIGN UP</h1>
                <p className="text-balance text-muted-foreground">
                  Sign up with your BSU email
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" className="rounded-lg" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="rounded-lg"
                  placeholder="m@batstate-u.edu.ph"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="rounded-lg"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="rounded-lg"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-purple-700 rounded-lg">
                Sign Up
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Login
                </a>
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
