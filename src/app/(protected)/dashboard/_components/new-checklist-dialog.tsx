import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createChecklistSchema, TCreateChecklistRequest } from "@/api/checklist/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateChecklistMutation } from "@/hooks/api/checklist/use-create-checklist-mutation";

export default function NewChecklistDialog() {
  const [open, setOpen] = useState(false);
  const { mutate: createChecklist, isPending } = useCreateChecklistMutation();

  const form = useForm<TCreateChecklistRequest>({
    resolver: zodResolver(createChecklistSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: TCreateChecklistRequest) => {
    createChecklist(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast.success("Checklist created successfully");
      },
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New Checklist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Checklist</DialogTitle>
          <DialogDescription>
            Create a new checklist to organize your tasks. Give it a descriptive name.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Checklist Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter checklist name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isPending}
                onClick={() => setOpen(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button disabled={isPending || !form.formState.isValid} type="submit">
                {isPending ? "Creating..." : "Create Checklist"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
