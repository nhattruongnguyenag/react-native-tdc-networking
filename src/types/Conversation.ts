import { Base } from "./Base";
import { User } from "./User";

export interface Conversation extends Base {
    sender: User
    receiver: User
}