import { LikeAction } from "./LikeActions";

export interface LikeSearch extends LikeAction {
    type: string,
    search: string
}