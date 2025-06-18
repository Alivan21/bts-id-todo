import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { TChecklist } from "@/api/checklist/type";
import { TChecklistItem } from "@/api/checklist-item/type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { useDeleteChecklistItemMutation } from "@/hooks/api/checklist-item/use-delete-checklist-item-mutation";
import NewChecklistItemDialog from "./new-checklist-item-dialog";
import UpdateChecklistItemDialog from "./update-checklist-item-dialog";

type ChecklistCardProps = {
  checklist: TChecklist;
  onDelete?: (checklistId: string) => void;
};

type ChecklistItemRowProps = {
  checklistId: string;
  item: TChecklistItem;
};

function ChecklistItemRow({ checklistId, item }: ChecklistItemRowProps) {
  const deleteItemMutation = useDeleteChecklistItemMutation(checklistId, item.id);

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-1 items-center space-x-2">
        {item.itemCompletionStatus ? (
          <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
        ) : (
          <Circle className="h-4 w-4 flex-shrink-0 text-gray-400" />
        )}
        <span
          className={`text-sm ${
            item.itemCompletionStatus ? "text-gray-500 line-through" : "text-gray-900"
          }`}
        >
          {item.name}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <UpdateChecklistItemDialog checklistId={checklistId} item={item} />
        <Button
          className="h-6 w-6 p-0"
          disabled={deleteItemMutation.isPending}
          onClick={() => deleteItemMutation.mutate()}
          size="sm"
          variant="ghost"
        >
          <Trash2 className="h-3 w-3 text-red-500" />
        </Button>
      </div>
    </div>
  );
}

export default function ChecklistCard({ checklist, onDelete }: ChecklistCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{checklist.name}</span>
          <div className="flex items-center gap-2">
            {checklist.checklistCompletionStatus ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
            {onDelete && (
              <CardAction>
                <Button
                  className="h-8 w-8 p-0"
                  onClick={() => onDelete(checklist.id)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardAction>
            )}
          </div>
        </CardTitle>
        <CardDescription className="sr-only">Card Description</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {checklist.items &&
            checklist.items.map((item) => (
              <ChecklistItemRow checklistId={checklist.id} item={item} key={item.id} />
            ))}

          {checklist.items && checklist.items.length === 0 && (
            <p className="text-sm text-gray-500 italic">No items in this checklist</p>
          )}
          <div className="mt-4">
            <NewChecklistItemDialog checklistId={checklist.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
