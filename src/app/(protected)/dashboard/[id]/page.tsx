import { CheckCircle, Circle, Home, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { TChecklistItem } from "@/api/checklist-item/type";
import { ROUTES } from "@/common/constants/routes";
import AlertConfirmDialog from "@/components/alert-dialog";
import { BreadcrumbsItem } from "@/components/breadcrumbs";
import PageContainer from "@/components/providers/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChecklistItemsQuery } from "@/hooks/api/checklist-item/use-checklist-items-query";
import { useDeleteChecklistItemMutation } from "@/hooks/api/checklist-item/use-delete-checklist-item-mutation";
import { useUpdateChecklistItemStatusMutation } from "@/hooks/api/checklist-item/use-update-checklist-item-status-mutation";
import NewChecklistItemDialog from "../_components/new-checklist-item-dialog";
import UpdateChecklistItemDialog from "../_components/update-checklist-item-dialog";

type ChecklistItemRowProps = {
  checklistId: string;
  item: TChecklistItem;
};

function ChecklistItemRow({ checklistId, item }: ChecklistItemRowProps) {
  const deleteItemMutation = useDeleteChecklistItemMutation(checklistId, item.id);
  const updateStatusMutation = useUpdateChecklistItemStatusMutation(checklistId, item.id);

  const handleToggleStatus = () => {
    updateStatusMutation.mutate(
      { isCompleted: !item.itemCompletionStatus },
      {
        onSuccess: () => {
          toast.success(
            item.itemCompletionStatus ? "Item marked as incomplete" : "Item marked as complete"
          );
        },
        onError: () => {
          toast.error("Failed to update item status");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-between space-x-3 rounded-lg border p-4 transition-colors hover:bg-gray-50">
      <div className="flex flex-1 items-center space-x-3">
        <Button
          className="h-6 w-6 p-0"
          disabled={updateStatusMutation.isPending}
          onClick={handleToggleStatus}
          size="sm"
          variant="ghost"
        >
          {item.itemCompletionStatus ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
        </Button>
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
          onClick={() => {
            deleteItemMutation.mutate(undefined, {
              onSuccess: () => {
                toast.success("Item deleted successfully");
              },
              onError: () => {
                toast.error("Failed to delete item");
              },
            });
          }}
          size="sm"
          variant="ghost"
        >
          <Trash2 className="h-3 w-3 text-red-500" />
          <span className="sr-only">Delete item</span>
        </Button>
      </div>
    </div>
  );
}

export default function ChecklistDetailPage() {
  const { id: checklistId } = useParams<{ id: string }>();

  const { data: checklistItemsResponse, isLoading, error } = useChecklistItemsQuery(checklistId!);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const checklistItems: TChecklistItem[] = checklistItemsResponse?.data || [];

  const breadcrumbs: BreadcrumbsItem[] = [
    {
      text: <Home className="h-4 w-4" />,
      url: ROUTES.DASHBOARD,
    },
    {
      text: "Checklist Details",
      url: `/dashboard/${checklistId}`,
    },
  ];

  const handleDeleteItem = () => {
    if (itemToDelete) {
      setItemToDelete(null);
    }
    setShowDeleteDialog(false);
  };

  if (isLoading) {
    return (
      <PageContainer breadcrumbs={breadcrumbs} showHomeIcon={false} title="Loading...">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading checklist items...</div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer breadcrumbs={breadcrumbs} showHomeIcon={false} title="Error">
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500">Failed to load checklist items</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer
        breadcrumbs={breadcrumbs}
        showHomeIcon={false}
        title="Checklist Details"
        topActions={
          <NewChecklistItemDialog
            checklistId={checklistId!}
            trigger={
              <Button>
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            }
          />
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>Checklist Items</CardTitle>
            <CardDescription>Manage and track individual items in your checklist</CardDescription>
          </CardHeader>
          <CardContent>
            {checklistItems.length > 0 ? (
              <div className="space-y-3">
                {checklistItems.map((item) => (
                  <ChecklistItemRow checklistId={checklistId!} item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="space-y-3">
                  <div className="text-gray-400">
                    <Circle className="mx-auto h-12 w-12" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">No items yet</p>
                    <p className="text-sm text-gray-400">
                      Add your first item to get started with this checklist
                    </p>
                  </div>
                  <NewChecklistItemDialog
                    checklistId={checklistId!}
                    trigger={
                      <Button variant="outline">
                        <Plus className="h-4 w-4" />
                        Add First Item
                      </Button>
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </PageContainer>

      <AlertConfirmDialog
        cancelText="Cancel"
        continueText="Delete"
        description="Are you sure you want to delete this item? This action cannot be undone."
        isDestructive={true}
        onContinue={handleDeleteItem}
        onOpenChange={setShowDeleteDialog}
        open={showDeleteDialog}
        title="Delete Item"
      />
    </>
  );
}
