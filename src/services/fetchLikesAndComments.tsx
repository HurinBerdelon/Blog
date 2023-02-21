import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended";
import { PostType } from "@/schema/Post";
import { Query } from "@prismicio/types";
import { api } from "./api";

export async function fetchLikesAndComments(document: Query<AllDocumentTypesExtended>) {
    const uids = document.results.map(result => result.uid)
    const { data } = await api.post<PostType[]>('/post/many', { uids })

    return ({
        ...document,
        results: document.results.map(result => {
            const post = data.find(post => post.uid === result.uid)
            return {
                ...result,
                comments: post.comment.length,
                likes: post.likes.length
            }
        })
    })
}