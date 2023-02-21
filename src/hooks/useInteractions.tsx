import { Interaction } from "@/schema/Interactions"
import { PostType } from "@/schema/Post"
import { api } from "@/services/api"
import { createContext, ReactNode, useContext, useState } from "react"

interface InteractionProviderProps {
    children: ReactNode
}

interface InteractionContextData {
    interactions: Interaction
    getInteractions: (uid: string) => Promise<void>
    likePost: () => void
    unlikePost: (likeId: string) => void
    saveComment: (content: string) => void
    updateComment: (content: string, commentId: string) => Promise<void>
    deleteComment: (commentId: string) => void
    LikeComment: (commentId: string) => void
    UnlikeComment: (likeId: string) => void
    saveAnswer: (content: string, commentId: string) => void
    updateAnswer: (content: string, answerId: string) => Promise<void>
    deleteAnswer: (answerId: string) => void
    LikeAnswer: (answerId: string) => void
    UnlikeAnswer: (likeId: string) => void
}

const InteractionContext = createContext<InteractionContextData>({} as InteractionContextData)

export function InteractionProvider({ children }: InteractionProviderProps): JSX.Element {

    const [interactions, setInteractions] = useState<Interaction>()
    const [post, setPost] = useState<PostType>()

    async function getInteractions(uid: string): Promise<void> {
        const { data } = await api.get<PostType>(`/post/single/${uid}`)
        setPost(data)
        setInteractions({
            comments: data.comment,
            likes: data.likes
        })
    }

    async function likePost() {
        await api.post('/post/like', {
            postId: post?.id
        })
        await getInteractions(post.uid)
    }

    async function unlikePost(likeId: string) {
        await api.delete(`/post/unlike/${likeId}`)
        await getInteractions(post.uid)
    }

    async function saveComment(content: string) {
        await api.post('/comment', {
            content,
            postId: post?.id
        })
        await getInteractions(post.uid)
    }

    async function updateComment(content: string, commentId: string) {
        await api.patch('/comment/update', {
            content,
            commentId
        })
        await getInteractions(post.uid)
    }

    async function deleteComment(commentId: string) {
        await api.delete(`/comment/delete/${commentId}`)
        await getInteractions(post.uid)
    }

    async function LikeComment(commentId: string) {
        await api.post('/comment/like', {
            commentId
        })
        await getInteractions(post.uid)
    }

    async function UnlikeComment(likeId: string) {
        await api.delete(`/comment/unlike/${likeId}`)
        await getInteractions(post.uid)
    }

    async function saveAnswer(content: string, commentId: string) {
        await api.post('/comment', {
            content,
            commentId: commentId
        })
        await getInteractions(post.uid)
    }

    async function updateAnswer(content: string, answerId: string) {
        await api.patch('/answer/update', {
            content,
            answerId
        })
        await getInteractions(post.uid)
    }

    async function deleteAnswer(answerId: string) {
        await api.delete(`/answer/delete/${answerId}`)
        await getInteractions(post.uid)
    }

    async function LikeAnswer(answerId: string) {
        await api.post('/answer/like', {
            answerId
        })
        await getInteractions(post.uid)
    }

    async function UnlikeAnswer(likeId: string) {
        await api.delete(`/answer/unlike/${likeId}`)
        await getInteractions(post.uid)
    }

    return (
        <InteractionContext.Provider value={{
            interactions,
            getInteractions,
            likePost,
            unlikePost,
            saveComment,
            updateComment,
            deleteComment,
            LikeComment,
            UnlikeComment,
            saveAnswer,
            updateAnswer,
            deleteAnswer,
            LikeAnswer,
            UnlikeAnswer,
        }}
        >
            {children}
        </InteractionContext.Provider>
    )
}

export function useInteraction() {
    return useContext(InteractionContext)
}