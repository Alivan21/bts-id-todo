import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { loginSchema, TLoginRequest } from "@/api/auth/schema";
import { ROUTES } from "@/common/constants/routes";
import { ErrorResponse } from "@/common/types/base-response";
import { useSession } from "@/components/providers/sessions";
import LoginForm from "./_components/form";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useSession();

  const form = useForm<TLoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: TLoginRequest) => {
    try {
      await login(data);
      toast.success("Login successful");
      void navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      const { message } = error as ErrorResponse;
      toast.error(message);
    }
  };

  return (
    <main className="m-auto flex w-full max-w-lg flex-col items-center p-5">
      <section className="mx-auto items-center space-y-4 text-center">
        <User className="mx-auto h-9 w-9" />
        <div className="space-y-1">
          <h1 className="mt-4 text-xl font-bold tracking-tight">Log in to our application</h1>
          <p className="text-muted-foreground mb-8 text-center text-sm">
            Enter your username and password to login
          </p>
        </div>
      </section>
      <LoginForm form={form} onSubmit={handleSubmit} />
      <p className="text-muted-foreground mb-8 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="text-primary hover:underline" to={ROUTES.REGISTER}>
          Register here
        </Link>
      </p>
    </main>
  );
}
