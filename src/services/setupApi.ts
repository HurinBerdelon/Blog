import { appKeys } from "@/config/AppKeys";
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { AuthTokenError } from "./errors/errors";

interface QueueObjectProps {
    onSucess: (token: string) => void
    onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: QueueObjectProps[] = []

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined = undefined) {

    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            Authorization: `Bearer ${cookies[appKeys.accessTokenKey]}`
        }
    })

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                if (error.response.data?.message === 'Invalid Token!') {

                    const originalConfig = error.config

                    if (!isRefreshing) {

                        cookies = parseCookies(ctx)
                        const refreshToken = cookies[appKeys.refreshTokenKey]

                        isRefreshing = true

                        api.post('/refresh', {}, {
                            headers: {
                                'x-refresh-token': refreshToken,
                            }
                        }).then(response => {
                            setCookie(ctx, appKeys.accessTokenKey, response.data.accessToken, {
                                maxAge: 60 * 60 * 24 * 7, // 7 days
                                path: '/'
                            })

                            setCookie(ctx, appKeys.refreshTokenKey, response.data.refreshToken.value, {
                                maxAge: 60 * 60 * 24 * 7, // 7 days
                                path: '/'
                            })

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
                                destroyCookie(ctx, appKeys.accessTokenKey)
                                destroyCookie(ctx, appKeys.refreshTokenKey)
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