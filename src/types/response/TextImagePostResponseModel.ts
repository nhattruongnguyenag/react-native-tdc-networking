import { Base } from "../Base";
import { Images } from "../Images";
import { PostResponseModel } from "./PostResponseModel";

export interface TextImagePostResponseModel extends PostResponseModel {
    content: string
    images: Images[]
}