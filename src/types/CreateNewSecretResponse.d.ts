

export interface CreateNewSecretResponse {
    /** Raw data is stored in instances of the Buffer class. A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized. Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex' */
    value: {
      type?: "Buffer"
      data?: number[]
    }
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
    /** Timestamp for when the secret was created. */
    createdAt?: number
    /** The unique identifier of the project which the secret belongs to. */
    projectId?: string
    /** Indicates whether the secret value can be decrypted after it has been created. */
    decryptable?: boolean
}