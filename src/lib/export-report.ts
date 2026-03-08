import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    backgroundColor: "#07060D",
    scale: 2,
    useCORS: true,
    logging: false,
  });
}

export async function downloadPDF(element: HTMLElement, filename: string) {
  const canvas = await captureElement(element);
  const imgData = canvas.toDataURL("image/png");
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // A4 dimensions in points
  const pdfWidth = 595.28;
  const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

  const pdf = new jsPDF({
    orientation: pdfHeight > 841.89 ? "portrait" : "portrait",
    unit: "pt",
    format: [pdfWidth, Math.max(pdfHeight, 841.89)],
  });

  // If content is taller than one page, use a long page
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}

export async function downloadImage(element: HTMLElement, filename: string) {
  const canvas = await captureElement(element);
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function shareImage(element: HTMLElement, title: string) {
  const canvas = await captureElement(element);
  
  return new Promise<void>((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        // Fallback to download
        const link = document.createElement("a");
        link.download = `${title}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        resolve();
        return;
      }

      if (navigator.share && navigator.canShare) {
        const file = new File([blob], `${title}.png`, { type: "image/png" });
        const shareData = { title, files: [file] };
        
        if (navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            resolve();
            return;
          } catch {
            // User cancelled or share failed, fallback to download
          }
        }
      }

      // Fallback: download
      const link = document.createElement("a");
      link.download = `${title}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      resolve();
    }, "image/png");
  });
}
