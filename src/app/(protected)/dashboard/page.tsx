import { Home } from "lucide-react";
import { ROUTES } from "@/common/constants/routes";
import { BreadcrumbsItem } from "@/components/breadcrumbs";
import PageContainer from "@/components/providers/page-container";

export default function DashboardPage() {
  const breadcrumbs: BreadcrumbsItem[] = [
    {
      text: <Home className="h-4 w-4" />,
      url: ROUTES.DASHBOARD,
    },
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs} showHomeIcon={false} title="Dashboard">
      <section className="flex flex-col gap-4">
        <h1 className="text-lg font-medium">Hello, Welcome Back</h1>
      </section>
    </PageContainer>
  );
}
