import {Blob} from "buffer";

export interface VercelFile {
	file: string
	data?: Blob | string
	sha?: string
	size?: number
	encoding?: string
}