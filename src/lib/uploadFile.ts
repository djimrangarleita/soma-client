import axios from "axios";
import { sleep } from "./utils";

const uploadFile = async (
  file: File
): Promise<string | never> => {
  const formData = new FormData()
  formData.append('avatar', file)

  await sleep(10000);
  const response = await axios.post('/api/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.status === 201) {
    return response.data.filePath;
  }
  throw new Error(response.data.error);
}

export default uploadFile;