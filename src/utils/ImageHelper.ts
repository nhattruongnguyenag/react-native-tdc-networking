import axios, { AxiosResponse } from "axios"
import { Asset } from "react-native-image-picker"
import { SERVER_ADDRESS } from "../constants/SystemConstant"
import { Data } from "../types/Data"

export const handleUploadImage = (imagesRequest: Asset[], onResult: (data: string[]) => void) => {
    const formData = new FormData()

    imagesRequest.forEach((item, index) => {
        const tempPhoto = {
            uri: item.uri,
            type: item.type,
            name: item.fileName
        }
        formData.append('files', tempPhoto)
    })

    axios
        .post<FormData, AxiosResponse<Data<string[]>>>(SERVER_ADDRESS + 'api/upload/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log('TEST:', res.data)
            onResult(res.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
}
