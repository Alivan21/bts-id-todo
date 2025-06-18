import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createChecklistItemSchema,
  TCreateChecklistItemRequest,
} from "@/api/checklist-item/schema";
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
import { useCreateChecklistItemMutation } from "@/hooks/api/checklist-item/use-create-checklist-item-mutation";

type NewChecklistItemDialogProps = {
  checklistId: string;
  trigger?: React.ReactNode;
};

export default function NewChecklistItemDialog({
  checklistId,
  trigger,
}: NewChecklistItemDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: createChecklistItem, isPending } = useCreateChecklistItemMutation(checklistId);

  const form = useForm<TCreateChecklistItemRequest>({
    resolver: zodResolver(createChecklistItemSchema),
    defaultValues: {
      itemName: "",
      isCompleted: false,
    },
  });

  const onSubmit = (data: TCreateChecklistItemRequest) => {
    createChecklistItem(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast.success("Checklist item created successfully");
      },
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full" size="sm" variant="outline">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Add a new item to this checklist. Give it a descriptive name.
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
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name..." {...field} />
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
                {isPending ? "Adding..." : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
