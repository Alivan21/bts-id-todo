import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { TChecklistItem } from "@/api/checklist-item/type";
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
import { useUpdateChecklistItemNameMutation } from "@/hooks/api/checklist-item/use-update-checklist-item-name-mutation";
import { useUpdateChecklistItemStatusMutation } from "@/hooks/api/checklist-item/use-update-checklist-item-status-mutation";

const updateChecklistItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  isCompleted: z.boolean(),
});

type TUpdateChecklistItemForm = z.infer<typeof updateChecklistItemSchema>;

type UpdateChecklistItemDialogProps = {
  checklistId: string;
  item: TChecklistItem;
  trigger?: React.ReactNode;
};

export default function UpdateChecklistItemDialog({
  checklistId,
  item,
  trigger,
}: UpdateChecklistItemDialogProps) {
  const [open, setOpen] = useState(false);

  const { mutate: updateItemName, isPending: isUpdatingName } = useUpdateChecklistItemNameMutation(
    checklistId,
    item.id
  );
  const { mutate: updateItemStatus, isPending: isUpdatingStatus } =
    useUpdateChecklistItemStatusMutation(checklistId, item.id);

  const isPending = isUpdatingName || isUpdatingStatus;

  const form = useForm<TUpdateChecklistItemForm>({
    resolver: zodResolver(updateChecklistItemSchema),
    defaultValues: {
      itemName: item.name,
      isCompleted: item.itemCompletionStatus,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        itemName: item.name,
        isCompleted: item.itemCompletionStatus,
      });
    }
  }, [item, open, form]);

  const handleNameUpdate = (itemName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      updateItemName(
        { itemName },
        {
          onSuccess: () => resolve(),
          onError: reject,
        }
      );
    });
  };

  const handleStatusUpdate = (isCompleted: boolean): Promise<void> => {
    return new Promise((resolve, reject) => {
      updateItemStatus(
        { isCompleted },
        {
          onSuccess: () => resolve(),
          onError: reject,
        }
      );
    });
  };

  const onSubmit = async (data: TUpdateChecklistItemForm) => {
    const hasNameChanged = data.itemName !== item.name;
    const hasStatusChanged = data.isCompleted !== item.itemCompletionStatus;

    if (!hasNameChanged && !hasStatusChanged) {
      setOpen(false);
      return;
    }

    try {
      const promises: Promise<void>[] = [];

      if (hasNameChanged) {
        promises.push(handleNameUpdate(data.itemName));
      }

      if (hasStatusChanged) {
        promises.push(handleStatusUpdate(data.isCompleted));
      }

      await Promise.all(promises);
      setOpen(false);
      toast.success("Checklist item updated successfully");
    } catch {
      toast.error("Failed to update checklist item");
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="h-6 w-6 p-0" size="sm" variant="ghost">
            <Edit className="h-3 w-3" />
            <span className="sr-only">Edit item</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Item</DialogTitle>
          <DialogDescription>
            Update the name and completion status of this checklist item.
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
            <FormField
              control={form.control}
              name="isCompleted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Button
                        className="flex-1"
                        onClick={() => field.onChange(true)}
                        size="sm"
                        type="button"
                        variant={field.value ? "default" : "outline"}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Completed
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => field.onChange(false)}
                        size="sm"
                        type="button"
                        variant={!field.value ? "default" : "outline"}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Incomplete
                      </Button>
                    </div>
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
                {isPending ? "Updating..." : "Update Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
