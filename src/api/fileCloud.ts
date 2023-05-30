import request from "./request";

const fileUpload = (
  file: File,
  onUploadProgress: (ProgressEvent: any) => void
) => {
  let formData = new FormData();
  formData.append("file", file);
  return request.post("/uploadFiles", formData, {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress,
  });
};
const getFiles = () => request.get("/fileCloud/getFiles");

const fileUploadService = {
  fileUpload,
  getFiles,
};

export default fileUploadService
