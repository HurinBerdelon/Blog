import { BlogPostDocument } from "prismicio-types";

export interface AllDocumentTypesExtended extends BlogPostDocument {
    comments?: number
    likes?: number
    data
}