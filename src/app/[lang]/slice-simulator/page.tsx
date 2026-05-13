import { SliceSimulator, SliceSimulatorParams, getSlices } from '@prismicio/next'
import { SliceZone } from '@prismicio/react'
import { components } from '../../../../slices'

export default async function SliceSimulatorPage({ searchParams }: SliceSimulatorParams) {
    const { state } = await searchParams
    return (
        <SliceSimulator>
            <SliceZone slices={getSlices(state)} components={components} />
        </SliceSimulator>
    )
}
