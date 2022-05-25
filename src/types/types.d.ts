import {VercelFile} from "./VercelFile";

export type SecurityParams = {
	bearer: string
}

export type DeploymentParams = {
	projectId: string,
} & SecurityParams;

export type CancelDeploymentParams = {
	id: string,
	teamId?: string
} & SecurityParams

export type CreateDeploymentParams = {
	files: Array<VercelFile>,
	forceNew?: boolean,
	target?: "staging" | "production",
	meta?: Record<string, any>
} & DeploymentParams

export type DeleteDeploymentParams = {
	id: string,
	teamId?: string,
	url?: string
} & SecurityParams

export type GetDeploymentByIdOrUrlParams = {
	idOrUrl: string
} & Partial<SecurityParams>

export type CreateProjectParams = {
	name: string,
	environmentVariables?: Array<string>,
	framework?: "null" | "blitzjs" | "nextjs" | "gatsby" | "remix" | "hexo" | "eleventy" | "docusaurus-2" | "docusaurus" | "preact" | "solidstart" | "dojo" | "ember" | "vue" | "scully" | "ionic-angular" | "angular" | "polymer" | "svelte" | "sveltekit" | "ionic-react" | "create-react-app" | "gridsome" | "umijs" | "sapper" | "saber" | "stencil" | "nuxtjs" | "redwoodjs" | "hugo" | "jekyll" | "brunch" | "middleman" | "zola" | "vite" | "parcel"
}  & SecurityParams

export type GetAllProjectsParam = {
	from?: number, //timestamp
	limit?: number,
	search?: string,
	teamId?: string
}  & SecurityParams

export type FindProjectByIdOrNameParam = {
	idOrName: string,
	teamId?: string
} & SecurityParams

export type ChangeSecretNameParam = {
	name: string,
	newName: string,
	teamId?: string
} & SecurityParams

export type CreateNewSecretParam = {
	teamId?: string,
	name: string,
	value: string,
	isDecryptable?: boolean
} & SecurityParams

export type DeleteSecretParam = {
	idOrName: string,
	teamId?: string
} & SecurityParams

export type GetSingleSecretParam = {
	idOrName: string,
	teamId?: string,
	decrypt?: boolean
} & SecurityParams

export type GetAllSecretParam = {
	id?: string,
	teamId?: string,
	projectId?: boolean
} & SecurityParams

export type LoginWithEmailParam = {
	email: string,
	tokenName?: string
}

export type VerifyLoginRequestParam = {
	token: string,
	email: string,
	tokenName?: string
}