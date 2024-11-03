import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface DashboardContentLayoutProps {
  children: React.ReactNode;
  routes?: {
    label: string;
    href: string;
  }[];
  rightComponent?: React.ReactNode;
}

export function DashboardContentLayout({
  children,
  routes,
  rightComponent,
}: DashboardContentLayoutProps) {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between gap-2 bg-background pl-2 pr-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="bg-background" />

          {routes && routes.length > 0 && (
            <>
              <Separator orientation="vertical" className="mr-2 h-4" />

              <Breadcrumb>
                <BreadcrumbList>
                  {routes.slice(0, -1).map((route, index) => (
                    <BreadcrumbItem key={index} className="hidden md:block">
                      <BreadcrumbLink href={route.href}>
                        {route.label}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </BreadcrumbItem>
                  ))}
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {routes[routes.length - 1]?.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </>
          )}
        </div>
        {rightComponent}
      </header>
      <div className="p-4">{children}</div>
    </div>
  );
}
