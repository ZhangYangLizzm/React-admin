import { RcFile } from "antd/es/upload";
const blobToBase64 = (imgBlob: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReaer = new FileReader();
    fileReaer.onload = (e) => {
      resolve(e.target?.result);
    };
    fileReaer.readAsDataURL(imgBlob);
  });
};

const xlsxToArrayBuffer = (file: RcFile) => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (ev) => {
      resolve(ev.target!.result as ArrayBuffer);
    };
  });
};
export { blobToBase64, xlsxToArrayBuffer };
