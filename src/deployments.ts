import axios from "axios";

import {
	DEPLOYMENTS_ENDPOINT_V12,
	DEPLOYMENTS_ENDPOINT_V13,
	DEPLOYMENTS_ENDPOINT_V6
} from "./constants";
import { CancelDeploymentResponse } from "./types/CancelDeploymentResponse";
import { CreateDeploymentResponse } from "./types/CreateDeploymentResponse";
import { GetDeploymentByIdOrUrlResponse } from "./types/GetDeploymentByIdOrUrlResponse";
import {
	CancelDeploymentParams,
	CreateDeploymentParams,
	DeleteDeploymentParams, DeploymentParams,
	GetDeploymentByIdOrUrlParams
} from "./types/types";
import {DeleteDeploymentResponse} from "./types/DeleteDeploymentResponse";
import {ListDeploymentsResponse} from "./types/ListDeploymentsReponse";


export async function CreateDeployment(param:CreateDeploymentParams){
	const {bearer, ...body} = param;
	return await axios.request<CreateDeploymentResponse>({
		method: 'post',
		url: DEPLOYMENTS_ENDPOINT_V13,
		params: {
			forceNew: !!param.forceNew ? 1 : 0
		},
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		data: {
			name: body.projectId, // Using the <project-id>.now.sh bit here
			files: body.files,
			meta: body.meta,
			target: body.target
		},
		validateStatus: () => true
	});
}

export async function GetDeploymentByIdOrUrl(param:GetDeploymentByIdOrUrlParams){
	return await axios.request<GetDeploymentByIdOrUrlResponse>({
		method: 'get',
		url: `${DEPLOYMENTS_ENDPOINT_V13}/${param.idOrUrl}`,
		headers: !!param.bearer ? {
			Authorization: `BEARER ${param.bearer}`,
			'Content-Type': 'application/json',
		} : {'Content-Type': 'application/json'},
		validateStatus: () => true
	});
}

export async function DeleteDeployment(param:DeleteDeploymentParams){
	const {id, bearer, ...query} = param;
	return await axios.request<DeleteDeploymentResponse>({
		method: 'delete',
		url: `${DEPLOYMENTS_ENDPOINT_V13}/${param.id}`,
		params: query,
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}

export async function ViewDeployments(param:DeploymentParams){
	return await axios.request<ListDeploymentsResponse>({
		url: DEPLOYMENTS_ENDPOINT_V6,
		headers: {
			Authorization: `BEARER ${param.bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true,
		params: {
			projectId: param.projectId
		}
	});
}

export async function CancelDeployment(param:CancelDeploymentParams){
	return await axios.request<CancelDeploymentResponse>({
		method: "patch",
		url: `${DEPLOYMENTS_ENDPOINT_V12}/${param.id}/cancel`,
		params: {teamId:param.teamId},
		headers: {
			Authorization: `BEARER ${param.bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}
