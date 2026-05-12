import Image from "next/image";

interface BannerProps {
    text: string;
    image: {
        src: string;
        alt: string;
    };
}

export function Banner({ image, text }: BannerProps): JSX.Element {
    return (
        <section>
            {image.src ? (
                <div className="w-full">
                    <Image
                        width={1920}
                        height={1920}
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full"
                        loading="eager"
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-60 bg-gradient-to-br lg:h-96 from-greenBrand to-zinc-200">
                    <h1 className="text-4xl font-bold text-textLight dark:text-backgroundDark">
                        {text}
                    </h1>
                </div>
            )}
        </section>
    );
}
