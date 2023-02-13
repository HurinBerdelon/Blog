import React from 'react'
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'

export type TextOnlyProps = SliceComponentProps<Content.TextOnlySlice>

const TextOnly = ({ slice }: TextOnlyProps) => (
	<section>
		<span className="title">
		</span>
		<style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: center;
        }
        .title {
          color: #8592e0;
        }
    `}</style>
	</section>
)

export default TextOnly