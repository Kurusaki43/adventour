import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CustomTableProps<T extends { id?: string }> = {
  data: T[] | undefined;
  cols: (keyof T | (string & {}))[];
  renderRow: (item: T, index?: number) => React.ReactNode;
  className?: string;
  caption?: string;
};

export function CustomTable<T extends { id?: string }>({
  data,
  cols,
  renderRow,
  className,
  caption,
}: CustomTableProps<T>) {
  return (
    <Table
      className={`w-full border border-border bg-card shadow-soft rounded-xl ${className}`}
    >
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow className="bg-muted-foreground/5">
          {cols.map((col) => (
            <TableHead
              key={String(col)}
              className={`font-semibold text-gray-700 dark:text-gray-300 capitalize h-12 text-center`}
            >
              {String(col)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => renderRow(item, index))}
      </TableBody>
    </Table>
  );
}
