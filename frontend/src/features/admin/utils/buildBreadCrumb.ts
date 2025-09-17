export const buildBreadcrumb = (pathname: string) => {
  const links = pathname.split("/").filter((link) => link !== "");
  const breadcrumbs = links.map((link, index) => {
    const path = "/" + links.slice(0, index + 1).join("/");
    const label = link === "admin" ? "Dashboard" : link.replace(/-/g, " ");

    return {
      label,
      path,
      isLast: index === links.length - 1,
    };
  });
  return breadcrumbs;
};
