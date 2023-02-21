import { AllDocumentTypes } from ".slicemachine/prismicio";

export interface AllDocumentTypesExtended extends AllDocumentTypes {
    comments: number
    likes: number
}