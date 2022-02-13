import axios from "axios";
import {PROJECTS_ENDPOINT_V8} from "./constants";
import {CreateProjectParams, FindProjectByIdOrNameParam, GetAllProjectsParam} from "./types/types";
import {GetAllProjectsResponse} from "./types/GetAllProjectsResponse";
import {CreateProjectResponse} from "./types/CreateProjectResponse";
import {FindProjectByIdOrNameResponse} from "./types/FindProjectByIdOrNameResponse";

export async function GetAllProjects(param:GetAllProjectsParam){
	const {bearer, ...query} = param;

	return await axios.request<GetAllProjectsResponse>({
		method: 'get',
		url: PROJECTS_ENDPOINT_V8,
		params: query,
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}

export async function FindProjectByIdOrName(param:FindProjectByIdOrNameParam){
	const {bearer, idOrName, ...query} = param;

	return await axios.request<FindProjectByIdOrNameResponse>({
		method: 'get',
		url: `${PROJECTS_ENDPOINT_V8}/${idOrName}`,
		params: query,
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}

export async function DeleteProject(param:FindProjectByIdOrNameParam){
	const {bearer, idOrName, ...query} = param;

	let response = await axios.request<{}>({
		method: 'delete',
		url: `${PROJECTS_ENDPOINT_V8}/${idOrName}`,
		params: query,
		headers: {
			Authorization: `BEARER ${bearer}`,
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});

	if (response.status === 204){
		// rewrite to standardise expected response. Logic will be rewritten
		response.status = 200;
	}

	return response;
}

export async function CreateProject(param:CreateProjectParams){
	return await axios.request<CreateProjectResponse>({
		method: 'post',
		url: PROJECTS_ENDPOINT_V8,
		headers: {
			Authorization: `BEARER ${param.bearer}`,
			'Content-Type': 'application/json',
		},
		data: {
			name: param.name,
			environmentVariables: param.environmentVariables ?? [],
			framework: param.framework
		},
		validateStatus: () => true
	})
}
