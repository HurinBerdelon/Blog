import React from 'react'
import type { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { RichTextComponent } from 'slices/RichTextComponents/RichTextComponent'

export type TextOnlyProps = SliceComponentProps<Content.TextOnlySlice>

const TextOnly = ({ slice }: TextOnlyProps) => {
	return (
		<section>
			<div className='flex flex-col gap-4 text-justify px-4 md:text-lg'>
				<RichTextComponent slice={slice} />
			</div>
		</section>
	)
}

export default TextOnly