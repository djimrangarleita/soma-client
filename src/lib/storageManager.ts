type LocalUserData = {
  id: string,
  token: string,
  avatar?: string
}

export const setUserData = (data: LocalUserData) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('id', data.id)
  if (data.avatar) localStorage.setItem('avatar', data.avatar);
}

export const clearStorage = () => {
  localStorage.clear();
}