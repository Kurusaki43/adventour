import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buildBreadcrumb } from "@/features/admin/utils/buildBreadCrumb";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

type DashboardBreadCrumbProps = {
  pathname: string;
  className?: string;
};
const DashboardBreadCrumb = ({
  pathname,
  className,
}: DashboardBreadCrumbProps) => {
  const breadcrumbs = buildBreadcrumb(pathname);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex gap-1 items-center">
              <Home className="size-3.5" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map(({ label, path, isLast }) => (
          <span key={path} className="flex items-center">
            <BreadcrumbSeparator className="mr-2" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to={path}
                  className={`capitalize ${isLast && "text-foreground"}`}
                >
                  {label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadCrumb;
