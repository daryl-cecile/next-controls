
export interface VerifyLoginRequestResponse {
	/** The user authentication token that can be used to perform API requests. */
	token: string
	/** Email address of the authenticated user. */
	email: string
	/** When completing SAML Single Sign-On authentication, this will be the ID of the Team that was authenticated for. */
	teamId?: string
}