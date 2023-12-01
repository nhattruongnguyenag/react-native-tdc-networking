import axios from 'axios'
import { UpdateNormalPost } from '../types/UpdateNormalPost'

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

export const updateNormalPostAPI = async (urlUpdate: string, data: any) => {
  try {
    const response = await axios.put(urlUpdate, data);
    return response.data.status;
  } catch (error) {
  }
}

export const updateImageUserProfile = async (urlUpdate: string, data: any) => {
  try {
    const response = await axios.post(urlUpdate, data);
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