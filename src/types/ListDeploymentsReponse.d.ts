import {Pagination} from "./Pagination";

export interface ListDeploymentsResponse {
	pagination: Pagination
	deployments: {
		/** The unique identifier of the deployment. */
		uid: string
		/** The name of the deployment. */
		name: string
		/** The URL of the deployment. */
		url: string
		/** Timestamp of when the deployment got created. */
		created: number
		/** In which state is the deployment. */
		state?:
			| "BUILDING"
			| "ERROR"
			| "INITIALIZING"
			| "QUEUED"
			| "READY"
			| "CANCELED"
		/** The type of the deployment. */
		type: "LAMBDAS"
		/** Metadata information of the user who created the deployment. */
		creator: {
			/** The unique identifier of the user. */
			uid: string
			/** The email address of the user. */
			email?: string
			/** The username of the user. */
			username?: string
			/** The GitHub login of the user. */
			githubLogin?: string
			/** The GitLab login of the user. */
			gitlabLogin?: string
		}
		/** An object containing the deployment's metadata */
		meta?: { [key: string]: string }
		/** On which environment has the deployment been deployed to. */
		target?: ("production" | "staging") | null
		/** An error object in case aliasing of the deployment failed. */
		aliasError?: {
			code: string
			message: string
		} | null
		aliasAssigned?: (number | boolean) | null
		/** Timestamp of when the deployment got created. */
		createdAt?: number
		/** Timestamp of when the deployment started building at. */
		buildingAt?: number
		/** Timestamp of when the deployment got ready. */
		ready?: number
		/** State of all registered checks */
		checksState?: "registered" | "running" | "completed"
		/** Conclusion for checks */
		checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled"
		/** Vercel URL to inspect the deployment. */
		inspectorUrl: string | null
	}[]
}