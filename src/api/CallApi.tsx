import axios from 'axios'

export const postAPI = async (apiUrlPost: string) => {
  try {
    const response = await axios.get(apiUrlPost)
    return response.data
  } catch (error) {
  }
}

export const savePostAPI = async (urlSavePost: string, data: any) => {
  try {
    const response = await axios.post(urlSavePost, data);
    return response.data.status;
  } catch (error) {
  }
}

export const exportDefaultAPI = () => {

}

export const handlePutDataAPI = async (apiUrl: string, postData: any): Promise<number> => {
  try {
    const response = await axios.post(apiUrl, postData)
    return response.data.status
  } catch (error) {
  }
}

export const deletePostAPI = async (urlDeletePost: string, postId: number) => {
  try {
    const response = await axios.delete(urlDeletePost + postId);
    return response.data.status;
  } catch (error) {
  }
}

export const followAPI = async (urlFollow: string, followData: any) => {
  try {
    const response = await axios.post(urlFollow, followData);
    return response.data.status;
  } catch (error) {
  }
}