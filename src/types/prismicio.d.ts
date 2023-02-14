import "@prismicio/types";

declare module '@prismicio/types' {
    export interface RTNode {
        text: string
        type: "embed" | "image" | "heading1" | "heading2" | "heading3" | "heading4" | "heading5" | "heading6" | "paragraph" | "preformatted" | "list-item" | "o-list-item" | undefined
    }
}