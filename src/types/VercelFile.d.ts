
export interface VercelFile {
	file: string
	data?: import("buffer").Blob | string
	sha?: string
	size?: number
	encoding?: string
}