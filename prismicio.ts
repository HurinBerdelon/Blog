import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import config from './slicemachine.config.json'

export const repositoryName = config.repositoryName

const routes: prismic.ClientConfig['routes'] = [
    { type: 'blog_post', path: '/en/post/:uid', lang: 'en-us' },
    { type: 'blog_post', path: '/pt-BR/post/:uid', lang: 'pt-br' },
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
