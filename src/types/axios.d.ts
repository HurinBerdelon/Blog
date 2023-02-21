import { HeadersDefaults } from "axios";

declare module 'axios' {

    interface HeadersDefaults {
        Authorization: string
    }
}