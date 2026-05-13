import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import config from './slicemachine.config.json'

export const repositoryName = config.repositoryName

const routes: prismic.ClientConfig['routes'] = [
    { type: 'blog_post', path: '/post/:uid' },
]

export const createClient = (clientConfig: prismicNext.CreateClientConfig = {}) => {
    const client = prismic.createClient(repositoryName, {
        routes,
        fetchOptions: { next: { tags: ['prismic'] } },
        ...clientConfig,
    })

    prismicNext.enableAutoPreviews({ client })

    return client
}
