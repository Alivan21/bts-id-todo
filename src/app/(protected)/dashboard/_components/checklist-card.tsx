import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react";
import { TChecklist } from "@/api/checklist/type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

interface ChecklistCardProps {
  checklist: TChecklist;
  onDelete?: (checklistId: string) => void;
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
              <div className="flex items-center space-x-2" key={item.id}>
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
            ))}

          {checklist.items && checklist.items.length === 0 && (
            <p className="text-sm text-gray-500 italic">No items in this checklist</p>
          )}
          <Button className="mt-10 w-full" size="sm" variant="outline">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
