interface BannerProps {
    text: string
    image: {
        src: string
        alt: string
    }
    link?: string
}

export function Banner({ image, text, link = '' }: BannerProps): JSX.Element {

    return (
        <section>
            Banner
        </section>
    )
}