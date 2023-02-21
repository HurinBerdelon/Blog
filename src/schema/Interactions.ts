export interface Answer {
    id: string
    content: string
    createdAt: string
    author: Author
    likes: Like[]
}

export interface Author {
    id: string
    name: string
    avatarURL: string
}

export interface Comment {
    id: string
    content: string
    createdAt: string
    author: Author
    answers: Answer[]
    likes: Like[]
}

export interface Like {
    id: string
    userId: string
}

export interface Interaction {
    comments: Comment[]
    likes: Like[]
}