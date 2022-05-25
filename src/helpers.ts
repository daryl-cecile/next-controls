import { URL, URLSearchParams } from "url";


export function composeUrl(baseUrl:string, queryParams?:Record<string, string>){
    if (!queryParams) {
        return baseUrl;
    }
    const url = new URL(baseUrl);

    for (let paramKey in queryParams){
        url.searchParams.append(paramKey, queryParams[paramKey]);
    }

    return url.toString();
}