import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
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
                  className="rounded-lg"
                  placeholder="m@batstate-u.edu.ph"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="rounded-lg"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-purple-700 rounded-lg">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
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
