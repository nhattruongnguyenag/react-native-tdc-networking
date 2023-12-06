import { Base } from "../Base";
import { Images } from "../Images";
import { PostResponseModal } from "./PostResponseModal";

export interface TextImagePostResponseModal extends PostResponseModal {
    content: string
    images: Images[]
}