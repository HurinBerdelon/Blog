import React from 'react'
import type { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'

export type TextOnlyProps = SliceComponentProps<Content.TextOnlySlice>

const TextOnly = ({ slice }: TextOnlyProps) => {
	return (
		<section>
			<div className='flex flex-col gap-4 text-justify px-4 md:text-lg'>
				<PrismicRichText
					components={{
						hyperlink: ({ children, node }) => (
							<Link
								className='underline hover:text-greenBrandDark italic'
								href={node.data.url}
							>
								{children}
							</Link>
						)
					}}
					field={slice.primary.text_content}
				/>
			</div>
		</section>
	)
}

export default TextOnly