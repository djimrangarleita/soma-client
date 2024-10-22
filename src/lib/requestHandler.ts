/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../config";

const requestHandler = async (requestPath: string, method: string = 'GET', data?: any): Promise<Response | never> => {
  const token = localStorage.getItem('token') || '';
 
  const response = await fetch(`${config.serverUrl}/api/${requestPath}`, {
    method: method.toUpperCase(),
    body: JSON.stringify(data),
    headers: {
      'X-TOKEN': token,
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export default requestHandler;

// const comment = {
//   text: "Aedificium thermae vicissitudo.",
//   "user": {
//     "id": "74751b62-af62-4f0e-9b13-3f93190ba2e0",
//     "name": "Christina Abshire",
//     "avatar": "https://avatars.githubusercontent.com/u/75119990",
//     "_count": {
//       "notes": 2,
//       "libraries": 7,
//       "posts": 5,
//       "comments": 25,
//       "postLikes": 13,
//       "commentLikes": 77
//     }
//   },
//   "createdAt": new Date("2024-10-20T20:35:49.981Z"),
//   "_count": {
//     "likes": 2,
//     "children": 0
//   }
// };