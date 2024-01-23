import { Buffer } from "exceljs";
const execlDownloadClick = (buffer: Buffer, fileName: string): void => {
  let a = document.createElement("a");
  let blob = new Blob([buffer], { type: "text/plain" });
  a.download = `${fileName}.xlsx`;
  a.href = URL.createObjectURL(blob);
  a.click();
};
export { execlDownloadClick };
