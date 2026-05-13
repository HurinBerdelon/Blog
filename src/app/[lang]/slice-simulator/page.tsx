'use client'
import { SliceZone } from '@prismicio/react'
import { SliceSimulator } from '@prismicio/slice-simulator-react'
import { components } from '../../../../slices'

export default function SliceSimulatorPage() {
    return (
        <SliceSimulator
            sliceZone={({ slices }) => (
                <SliceZone slices={slices as any} components={components} />
            )}
        />
    )
}
