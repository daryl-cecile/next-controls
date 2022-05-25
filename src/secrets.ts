import axios from "axios";

import {
	SECRETS_ENDPOINT_V2,
    SECRETS_ENDPOINT_V3
} from "./constants";
import { ChangeSecretNameParam } from "./types/types";
import { CreateNewSecretParam } from "./types/types";
import { DeleteSecretParam } from "./types/types";
import { GetSingleSecretParam } from "./types/types";
import { GetAllSecretParam } from "./types/types";
import { ChangeSecretNameResponse } from "./types/ChangeSecretNameResponse";
import { CreateNewSecretResponse } from "./types/CreateNewSecretResponse";
import { DeleteSecretResponse } from "./types/DeleteSecretResponse";
import { GetSingleSecretResponse } from "./types/GetSingleSecretResponse";
import { GetAllSecretResponse } from "./types/GetAllSecretResponse";

export async function ChangeSecretName(param:ChangeSecretNameParam){
	const {bearer, teamId, ...body} = param;
    return await axios.request<ChangeSecretNameResponse>({
		method: 'patch',
		url: `${SECRETS_ENDPOINT_V2}/${body.name}`,
		params: { teamId },
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		data: {
			name: body.newName
		},
		validateStatus: () => true
	});
}

export async function CreateNewSecret(param:CreateNewSecretParam){
	const {bearer, teamId, ...body} = param;
    return await axios.request<CreateNewSecretResponse>({
		method: 'post',
		url: `${SECRETS_ENDPOINT_V2}/${body.name}`,
		params: { teamId },
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		data: {
			name: body.name,
            value: body.value,
            decryptable: body.isDecryptable
		},
		validateStatus: () => true
	});
}

export async function DeleteSecret(param:DeleteSecretParam){
	const {bearer, teamId, ...body} = param;
    return await axios.request<DeleteSecretResponse>({
		method: 'delete',
		url: `${SECRETS_ENDPOINT_V2}/${body.idOrName}`,
		params: { teamId },
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}

export async function GetSingleSecret(param:GetSingleSecretParam){
	const {bearer, teamId, ...body} = param;
    return await axios.request<GetSingleSecretResponse>({
		method: 'get',
		url: `${SECRETS_ENDPOINT_V3}/${body.idOrName}`,
		params: { 
            teamId, 
            decrypt: body.decrypt ? 'true' : 'false'
        },
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}

export async function GetAllSecrets(param:GetAllSecretParam){
	const {bearer, teamId, id, projectId, ...body} = param;
    return await axios.request<GetAllSecretResponse>({
		method: 'get',
		url: SECRETS_ENDPOINT_V3,
		params: { 
            teamId, 
            id,
            projectId
        },
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}