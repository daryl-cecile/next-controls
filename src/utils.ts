import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {ListDeploymentsResponse} from "./types/ListDeploymentsReponse";

type WrappedResponse<T> = AxiosResponse<T> & {responseDetail:string}

export function mapStatusCode<T>(response:AxiosResponse<T>, codes:Record<number, string>):WrappedResponse<T>{
	// muggy but attaching like so to preserve response object
	(response as WrappedResponse<T>)['responseDetail'] = codes[response.status];
	return response as WrappedResponse<T>;
}

export function composeUrl(base:string, query:Record<string, any> ={}){
	let finalUrl = base + '?';
	Object.entries(query).forEach( ([name,value]) => {
		if (value === undefined) return;
		finalUrl += `${encodeURIComponent(name)}=${encodeURIComponent(value)}&`
	} );
	return finalUrl.substring(0, finalUrl.length - 1);
}