import React from 'react'
import type { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type TextOnlyProps = SliceComponentProps<Content.TextOnlySlice>

const TextOnly = ({ slice }: TextOnlyProps) => {
	return (
		<section>
			<div className='flex flex-col gap-4 text-justify px-4'>
				<PrismicRichText field={slice.primary.text_content} />
			</div>
		</section>
	)
}

export default TextOnly