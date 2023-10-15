import axios from "axios";

export const postAPI = async (apiUrlPost: string) => {
    try {
        const response = await axios.get(apiUrlPost);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const likeApi = async (urlLike: string, dataLike: any): Promise<number> => {
    try {
        const response = await axios.post(urlLike, dataLike);
        return response.data.status;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const callApiComment = async (urlApiCreateComment: string, data: any): Promise<number> => {
    try {
        const response = await axios.post(urlApiCreateComment, data);
        return response.data.status;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
