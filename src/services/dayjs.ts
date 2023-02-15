import dayjs from "dayjs";
// dayjs().format()

export function formatDate(date: string) {
    return dayjs(date).format('DD/MM/YYYY')
}