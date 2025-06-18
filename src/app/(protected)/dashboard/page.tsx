import { Home } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/common/constants/routes";
import AlertConfirmDialog from "@/components/alert-dialog";
import { BreadcrumbsItem } from "@/components/breadcrumbs";
import PageContainer from "@/components/providers/page-container";
import { useChecklistsQuery } from "@/hooks/api/checklist/use-checklists-query";
import { useDeleteChecklistMutation } from "@/hooks/api/checklist/use-delete-checklist-mutation";
import ChecklistCard from "./_components/checklist-card";
import NewChecklistDialog from "./_components/new-checklist-dialog";

export default function DashboardPage() {
  const { data: checklistResponse } = useChecklistsQuery();
  const { mutate: deleteChecklist } = useDeleteChecklistMutation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [checklistToDelete, setChecklistToDelete] = useState<string | null>(null);

  const breadcrumbs: BreadcrumbsItem[] = [
    {
      text: <Home className="h-4 w-4" />,
      url: ROUTES.DASHBOARD,
    },
  ];

  const checklists = checklistResponse?.data || [];

  const handleDeleteChecklist = (checklistId: string) => {
    setChecklistToDelete(checklistId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (checklistToDelete) {
      deleteChecklist(checklistToDelete);
      setChecklistToDelete(null);
    }
    setShowDeleteDialog(false);
  };

  return (
    <>
      <PageContainer
        breadcrumbs={breadcrumbs}
        showHomeIcon={false}
        title="Todo List"
        topActions={<NewChecklistDialog />}
      >
        <h2 className="text-2xl font-semibold">My Checklists</h2>
        <section className="flex flex-col gap-4">
          {checklists.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {checklists.map((checklist) => (
                <ChecklistCard
                  checklist={checklist}
                  key={checklist.id}
                  onDelete={handleDeleteChecklist}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                No checklists found. Create your first checklist to get started!
              </p>
            </div>
          )}
        </section>
      </PageContainer>

      <AlertConfirmDialog
        cancelText="Cancel"
        continueText="Delete"
        description="Are you sure you want to delete this checklist? This action cannot be undone."
        isDestructive={true}
        onContinue={confirmDelete}
        onOpenChange={setShowDeleteDialog}
        open={showDeleteDialog}
        title="Delete Checklist"
      />
    </>
  );
}
