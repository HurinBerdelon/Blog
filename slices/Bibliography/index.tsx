import React from 'react'
import type { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { HyperLink } from 'slices/RichTextComponents/HyperLink'
import { useTranslation } from '@/hooks/useTranslation'

export type BibliographyProps = SliceComponentProps<Content.BibliographySlice & { id: string }>

const Bibliography = ({ slice }: BibliographyProps) => {
	const { t } = useTranslation()

	if (!slice.items.length) {
		return null
	}

	return (
		<section className="px-4 pt-6 mt-12 border-t border-greenBrandDark dark:border-textLight">
			<h2 className="text-sm font-medium tracking-wide uppercase opacity-70">
				{t('common:bibliography')}
			</h2>
			<ul className="flex flex-col gap-2 mt-2 text-sm">
				{slice.items.map((item, index) => (
					<li key={index} className="text-justify">
						<div className="[&>p]:inline">
							<PrismicRichText components={{ hyperlink: HyperLink }} field={item.entry_text} />
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}

export default Bibliography
