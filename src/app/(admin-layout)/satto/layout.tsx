import { checkAdmin } from '@/actions/role-action';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/shadcnUI/breadcrumb';
import { Separator } from '@/components/shadcnUI/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/shadcnUI/sidebar';
import { notFound } from 'next/navigation';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  if (!(await checkAdmin())) {
    return notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {/* <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" /> */}
              <BreadcrumbItem>
                <BreadcrumbPage>상금 관리</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
