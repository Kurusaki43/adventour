import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@/assets/Logo.svg";

type ExportPDFProps<T> = {
  dataList: T[];
  headCols: (keyof T)[];
  fileName?: string;
  labels?: Partial<Record<keyof T, string>>;
  logoUrl?: string; // base64 or public image URL
  pageTitle: string;
};

const ExportPDF = <T,>({
  dataList,
  headCols,
  fileName = "list",
  labels,
  logoUrl,
  pageTitle,
}: ExportPDFProps<T>) => {
  const handleExport = async () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const marginTop = 20;
    const tableTopOffset = 25;

    // Draw logo (optional)
    const logoImg = logoUrl || logo;
    if (logoImg) {
      try {
        const image = await loadImageAsBase64(logoImg);
        doc.addImage(image, "PNG", 14, 10, 30, 15); // X, Y, Width, Height
      } catch (err) {
        console.warn("Failed to load logo:", err);
      }
    }

    // Title with spacing
    doc.setFontSize(16);
    doc.text(pageTitle, 75, marginTop + 15);

    // Table
    autoTable(doc, {
      startY: marginTop + tableTopOffset,
      head: [headCols.map((col) => labels?.[col] ?? col.toString())],
      body: dataList.map((item) =>
        headCols.map((col) => {
          const value = item[col];
          return typeof value === "string" || typeof value === "number"
            ? value
            : JSON.stringify(value);
        })
      ),
      margin: { bottom: 30 },
      didDrawPage: () => {
        const str = `Generated on: ${new Date().toLocaleDateString()}`;
        doc.setFontSize(10);
        doc.text(str, 14, doc.internal.pageSize.getHeight() - 10);

        const pageText = `Page ${1}`;
        doc.text(
          pageText,
          pageWidth - 30,
          doc.internal.pageSize.getHeight() - 10
        );
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  return (
    <Button onClick={handleExport} variant="outline">
      Export as PDF
    </Button>
  );
};

export default ExportPDF;

const loadImageAsBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // needed for remote logos
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context not found");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
  });
};
