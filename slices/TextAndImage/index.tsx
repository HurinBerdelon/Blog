import React from 'react'
import { PrismicImage } from '@prismicio/react'
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import { RichTextComponent } from 'slices/RichTextComponents/RichTextComponent'


export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>

const TextAndImage = ({ slice }: TextAndImageProps) => (
	<section className='flex flex-col'>
		<div className='my-6 flex flex-col gap-4 text-justify px-4 md:text-lg'>
			<RichTextComponent slice={slice} />
		</div>
		<div className={`flex self-center w-[${slice.primary.image.dimensions.width}px]`}>
			<PrismicImage field={slice.primary.image} className={`cover mx-4 rounded-lg overflow-hidden`} />
		</div>
	</section>
)

export default TextAndImage