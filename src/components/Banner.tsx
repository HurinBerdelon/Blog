import Image from "next/image"

interface BannerProps {
    text: string
    image: {
        src: string
        alt: string
    }
}

export function Banner({ image, text }: BannerProps): JSX.Element {

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
                        <h1 className="font-bold text-4xl text-textLight dark:text-backgroundDark">{text}</h1>
                    </div>
                )}
        </section>
    )
}