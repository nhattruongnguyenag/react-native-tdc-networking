import axios from 'axios'

export const postAPI = async (apiUrlPost: string) => {
  try {
    const response = await axios.get(apiUrlPost)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const savePostAPI = async (urlSavePost: string, data: any) => {
  try {
    const response = await axios.post(urlSavePost, data);
    return response.data.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const handlePutDataAPI = async (apiUrl: string, postData: any): Promise<number> => {
  try {
    const response = await axios.post(apiUrl, postData)
    return response.data.status
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
