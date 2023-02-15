import React from 'react'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>

const TextAndImage = ({ slice }: TextAndImageProps) => (
	<section>
		<div className='my-6'>
			<PrismicImage field={slice.primary.image} />
		</div>
		<div className='flex flex-col gap-4 text-justify px-4 md:text-lg'>
			<PrismicRichText field={slice.primary.text_content} />
		</div>
	</section>
)

export default TextAndImage