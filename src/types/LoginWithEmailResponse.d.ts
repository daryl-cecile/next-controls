
export interface LoginWithEmailResponse {
	/** The token used to verify the user accepted the login request */
	token: string
	/** The code the user is going to receive on the email. **Must** be displayed to the user so they can verify the request is the correct. */
	securityCode: string
}