import React from 'react'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>

const TextAndImage = ({ slice }: TextAndImageProps) => (
	<section>
		<div className='my-6'>
			<PrismicImage field={slice.primary.image} />
		</div>
		<div className='flex flex-col gap-4 text-justify px-4 md:text-lg'>
			<PrismicRichText
				components={{
					hyperlink: ({ children, node }) => (
						<Link
							className='underline hover:text-greenBrandDark italic dark:hover:text-grayBrand'
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

export default TextAndImage