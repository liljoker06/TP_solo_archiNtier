import axiosInstance from './axiosInstance' 

export const createEvent = async (eventData) => {
  const response = await axiosInstance.post('/events', eventData)
  return response.data
}
