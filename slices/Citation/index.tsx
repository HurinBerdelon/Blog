import React from 'react'
import type { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { RichTextComponent } from 'slices/RichTextComponents/RichTextComponent'

export type CitationProps = SliceComponentProps<Content.CitationSlice & { id: string }>

const Citation = ({ slice }: CitationProps) => {
	return (
		<section className="mt-4">
			<blockquote className="flex flex-col gap-4 pl-24 pr-4 text-sm text-justify md:pl-32 md:text-base">
				<RichTextComponent slice={slice} />
			</blockquote>
		</section>
	)
}

export default Citation
