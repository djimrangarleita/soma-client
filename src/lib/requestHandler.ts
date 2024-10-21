/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../config";

const requestHandler = async (requestPath: string, method: string = 'GET', data?: any): Promise<Response> => {
  const token = localStorage.getItem('X-TOKEN') || '';
  const response = await fetch(`${config.serverUrl}/api/${requestPath}`, {
    method: method.toUpperCase(),
    body: data,
    headers: {
      'X-TOKEN': token,
    },
  });
  return response.json();
};

export default requestHandler;