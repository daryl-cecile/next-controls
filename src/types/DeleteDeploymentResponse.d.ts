
export interface DeleteDeploymentResponse {
	/** The removed deployment ID. */
	uid: string
	/** A constant with the final state of the deployment. */
	state: "DELETED"
}