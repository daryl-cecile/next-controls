

export interface DeleteSecretResponse {
    /** The unique identifier of the deleted secret. */
    uid: string
    /** The name of the deleted secret. */
    name: string
    /** The date when the secret was created. */
    created: number
}