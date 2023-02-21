import NextAuth from "next-auth/next";

declare module 'next-auth' {

    interface Session {
        user: {
            providerId: string,
            name: string,
            image: string,
        }
    }
}