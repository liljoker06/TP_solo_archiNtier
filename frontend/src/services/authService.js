import axiosInstance from './axiosInstance'

export const login = async (email, password) => {
  const response = await axiosInstance.post('/users/login', {
    email,
    password,
  })
  return response.data
}

export const register = async (formData) => {
  const response = await axiosInstance.post('/users/register', formData)
  return response.data
}

export const logout = () => {
  localStorage.removeItem('isAuth')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

export const getUserRole = async () => {
  const response = await axiosInstance.get('/users/check')
  return response.data
}
