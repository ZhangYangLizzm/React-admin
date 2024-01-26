const blobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const fileReaer = new FileReader();
    fileReaer.onload = (e) => {
      resolve(e.target?.result as string);
    };
    fileReaer.readAsDataURL(blob);
  });
};

const fileToArrayBuffer = (file: File) => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (ev) => {
      resolve(ev.target!.result as ArrayBuffer);
    };
  });
};

export { blobToBase64, fileToArrayBuffer };
