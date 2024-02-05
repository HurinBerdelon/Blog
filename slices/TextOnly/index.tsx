import React from "react";
import { RichTextComponent } from "slices/RichTextComponents/RichTextComponent";

const TextOnly = ({ slice }: any) => {
  return (
    <section className="mt-4">
      <div className="flex flex-col gap-4 text-justify px-4 md:text-lg">
        <RichTextComponent slice={slice} />
      </div>
    </section>
  );
};

export default TextOnly;
