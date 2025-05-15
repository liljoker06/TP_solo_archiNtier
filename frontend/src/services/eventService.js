import axiosInstance from './axiosInstance'

export const createEvent = async (formData) => {
  const response = await axiosInstance.post('/events/', formData)
  return response.data
}



export const fetchEvents = async () => {
  const response = await axiosInstance.get('/events/')
  return response.data
}