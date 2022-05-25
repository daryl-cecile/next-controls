import { Pagination } from "./Pagination"


export interface GetAllSecretResponse {
    secrets: {
        /** The date when the secret was created. */
        created: string
        /** The name of the secret. */
        name: string
        /** The unique identifier of the team the secret was created for. */
        teamId?: string | null
        /** The unique identifier of the secret. */
        uid: string
        /** The unique identifier of the user who created the secret. */
        userId?: string
        /** The value of the secret. */
        value?: string
        /** Timestamp for when the secret was created. */
        createdAt?: number
        /** The unique identifier of the project which the secret belongs to. */
        projectId?: string
        /** Indicates whether the secret value can be decrypted after it has been created. */
        decryptable?: boolean
      }[]
      pagination: Pagination
}