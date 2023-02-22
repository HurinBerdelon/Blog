export interface PrismicAuthor {
    data: {
        name: string
        authorprofileimage: {
            dimension: {
                width: number
                height: number
            },
            alt: string
            url: string
        }
    }
}