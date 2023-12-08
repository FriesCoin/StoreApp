
import { parseCookies, setCookie, destroyCookie } from 'nookies'
type UsersSorting = {
    "Filter": string
    "Sort":   string
    "max":    string
    "min":    string
}
export default function UpdateSortS({sorting}:{sorting:UsersSorting}){
    for (const [key, value] of Object.entries(sorting)) {
      setCookie(null,key, value);
    }
    return <></>
}