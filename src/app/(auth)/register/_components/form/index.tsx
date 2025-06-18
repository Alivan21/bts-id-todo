import { UseFormReturn } from "react-hook-form";
import { TRegisterRequest } from "@/api/auth/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type RegisterFormProps = {
  form: UseFormReturn<TRegisterRequest>;
  onSubmit: (data: TRegisterRequest) => Promise<void>;
  isSubmitting?: boolean;
};

export default function RegisterForm({ form, onSubmit, isSubmitting }: RegisterFormProps) {
  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4 w-full"
          disabled={isSubmitting ?? form.formState.isSubmitting}
          type="submit"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
