import axios from "axios";
import config from "../config";

const uploadFile = async (
  file: File,
  folderName?: string
): Promise<string | never> => {
  const formData = new FormData()
  formData.append('file', file)
  const token = localStorage.getItem('token');

  const response = await axios.post(`${config.serverUrl}/api/upload?dir=${folderName||''}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-TOKEN': token,
    },
  });

  if (response.status === 201) {
    return response.data.filePath;
  }
  throw new Error(response.data.error);
}

export default uploadFile;