import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { register } from "@/api/auth";
import { registerSchema, TRegisterRequest } from "@/api/auth/schema";
import { ROUTES } from "@/common/constants/routes";
import { ErrorResponse } from "@/common/types/base-response";
import RegisterForm from "./_components/form";

export default function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: TRegisterRequest) => {
    try {
      await register(data);
      toast.success("Register successful");
      void navigate("/login");
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
          <h1 className="mt-4 text-xl font-bold tracking-tight">Register to our application</h1>
          <p className="text-muted-foreground mb-8 text-center text-sm">
            Enter your username, email and password to register
          </p>
        </div>
      </section>
      <RegisterForm form={form} onSubmit={handleSubmit} />
      <p className="text-muted-foreground mb-8 text-center text-sm">
        Already have an account?{" "}
        <Link className="text-primary hover:underline" to={ROUTES.LOGIN}>
          Login here
        </Link>
      </p>
    </main>
  );
}
