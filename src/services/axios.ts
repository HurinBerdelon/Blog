import axios from "axios";

export const axiosAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BLOG_URL
})