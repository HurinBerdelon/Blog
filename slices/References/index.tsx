import React from 'react'
import type { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { HyperLink } from 'slices/RichTextComponents/HyperLink'
import { useTranslation } from '@/hooks/useTranslation'

export type ReferencesProps = SliceComponentProps<Content.ReferencesSlice & { id: string }>

const References = ({ slice }: ReferencesProps) => {
	const { t } = useTranslation()

	if (!slice.items.length) {
		return null
	}

	return (
		<section className="px-4 pt-6 mt-12 border-t border-greenBrandDark dark:border-textLight">
			<h2 className="text-sm font-medium tracking-wide uppercase opacity-70">
				{t('common:references')}
			</h2>
			<ol className="flex flex-col gap-2 mt-2 text-sm">
				{slice.items.map((item, index) => {
					const number = index + 1
					return (
						<li key={number} id={`ref-${number}`} className="flex gap-1 text-justify scroll-mt-24">
							<a
								href={`#cite-ref-${number}`}
								className="shrink-0 hover:underline"
								aria-label={`Back to citation ${number} in text`}
							>
								{`↩ [${number}]`}
							</a>
							<div className="[&>p]:inline">
								<PrismicRichText components={{ hyperlink: HyperLink }} field={item.reference_text} />
							</div>
						</li>
					)
				})}
			</ol>
		</section>
	)
}

export default References
