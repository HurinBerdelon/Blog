import { BlogPostDocument } from ".slicemachine/prismicio";

export interface AllDocumentTypesExtended extends BlogPostDocument {
    comments: number
    likes: number
    data
}