import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import sm from './sm.json'

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint)

export function createClient(config: prismicNext.CreateClientConfig = {}) {
    const client = prismic.createClient(sm.apiEndpoint, {
        ...config
    })

    prismicNext.enableAutoPreviews({
        client,
        previewData: config.previewData,
        req: config.req
    })

    return client
}