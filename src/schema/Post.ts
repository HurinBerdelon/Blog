import { Comment, Like } from "./Interactions";

export interface PostType {
    id: string,
    uid: string,
    createdAt: string,
    updatedAt: string,
    comment: Comment[],
    likes: Like[]
}