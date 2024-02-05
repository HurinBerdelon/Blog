import React from "react";
import { PrismicImage } from "@prismicio/react";
import { RichTextComponent } from "slices/RichTextComponents/RichTextComponent";

const TextAndImage = ({ slice }: any) => (
  <section className="flex flex-col">
    <div className="my-6 flex flex-col gap-4 text-justify px-4 md:text-lg">
      <RichTextComponent slice={slice} />
    </div>
    <div className="flex self-center">
      <PrismicImage
        field={slice.primary.image}
        width={slice.primary.image.dimensions.width}
        className="object-cover mx-4 rounded-lg overflow-hidden"
      />
    </div>
  </section>
);

export default TextAndImage;
