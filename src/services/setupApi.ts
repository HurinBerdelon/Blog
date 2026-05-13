import { appKeys } from '@/config/AppKeys'
import axios, { AxiosError } from 'axios'
import { signOut } from 'next-auth/react'
import { getCookie, setCookie, deleteCookie } from './cookies'
import { AuthTokenError } from './errors/errors'

interface QueueObjectProps {
    onSucess: (token: string) => void
    onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: QueueObjectProps[] = []

export function setupAPIClient() {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            Authorization: `Bearer ${getCookie(appKeys.accessTokenKey)}`
        }
    })

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                if (error.response.data?.message === 'Invalid Token!') {
                    const originalConfig = error.config

                    if (!isRefreshing) {
                        const refreshToken = getCookie(appKeys.refreshTokenKey)
                        isRefreshing = true

                        api.post('/refresh', {}, {
                            headers: { 'x-refresh-token': refreshToken }
                        }).then(response => {
                            setCookie(appKeys.accessTokenKey, response.data.accessToken, 60 * 60 * 24 * 7)
                            setCookie(appKeys.refreshTokenKey, response.data.refreshToken.value, 60 * 60 * 24 * 7)

                            api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`

                            failedRequestQueue.forEach(request => request.onSucess(response.data.accessToken))
                            failedRequestQueue = []
                        }).catch(error => {
                            failedRequestQueue.forEach(request => request.onFailure(error))
                            failedRequestQueue = []
                        }).finally(() => {
                            isRefreshing = false
                        })
                    }

                    return new Promise((resolve, reject) => {
                        failedRequestQueue.push({
                            onSucess: (token: string) => {
                                originalConfig.headers['Authorization'] = `Bearer ${token}`
                                resolve(api(originalConfig))
                            },
                            onFailure: (error: AxiosError) => {
                                deleteCookie(appKeys.accessTokenKey)
                                deleteCookie(appKeys.refreshTokenKey)
                                signOut()
                                reject(error)
                            }
                        })
                    })
                } else {
                    if (typeof window !== 'undefined') {
                        signOut()
                    } else {
                        return Promise.reject(new AuthTokenError())
                    }
                }
            }

            return Promise.reject(error)
        }
    )

    return api
}
