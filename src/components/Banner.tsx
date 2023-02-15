import Image from "next/image"

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
            {image.src
                ? (
                    <div className="w-full">
                        <Image width={1920} height={1920} src={image.src} alt={image.alt} className="cover w-full" />
                    </div>
                )
                : (
                    <div className="w-full h-60 lg:h-96 bg-gradient-to-br from-greenBrand to-zinc-200 flex justify-center items-center">
                        <h1 className="font-bold text-3xl text-textLight">{text}</h1>
                    </div>
                )}
        </section>
    )
}