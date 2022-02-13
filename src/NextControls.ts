import axios from "axios";
import {
    CancelDeploymentParams,
    CreateDeploymentParams,
    CreateProjectParams, DeleteDeploymentParams,
    DeploymentParams, FindProjectByIdOrNameParam, GetAllProjectsParam,
    GetDeploymentByIdOrUrlParams, LoginWithEmailParam, VerifyLoginRequestParam
} from "./types/types";

import {CreateDeploymentResponse} from "./types/CreateDeploymentResponse";
import {CreateProjectResponse} from "./types/CreateProjectResponse";
import {ListDeploymentsResponse} from "./types/ListDeploymentsReponse";
import {GetDeploymentByIdOrUrlResponse} from "./types/GetDeploymentByIdOrUrlResponse";
import {composeUrl} from "./utils";
import {GetAllProjectsResponse} from "./types/GetAllProjectsResponse";
import {DeleteDeploymentResponse} from "./types/DeleteDeploymentResponse";
import {LoginWithEmailResponse} from "./types/LoginWithEmailResponse";
import {VerifyLoginRequestResponse} from "./types/VerifyLoginRequestResponse";
import {CancelDeploymentResponse} from "./types/CancelDeploymentResponse";
import {FindProjectByIdOrNameResponse} from "./types/FindProjectByIdOrNameResponse";

const PROJECTS_ENDPOINT_V8 = "https://api.vercel.com/v8/projects"; //usedFor: list, create
const DEPLOYMENTS_ENDPOINT_V13 = "https://api.vercel.com/v13/deployments"; //usedFor: deploy, get
const DEPLOYMENTS_ENDPOINT_V12 = "https://api.vercel.com/v12/deployments"; //usedFor: cancel
const DEPLOYMENTS_ENDPOINT_V6 = "https://api.vercel.com/v6/deployments"; //usedFor: list
const REGISTRATION_ENDPOINT = "https://api.vercel.com/registration"; //usedFor: registration

/*
TODO
    - Environment Variable : Get, Set, Edit
    - Log drain: Delete, Create
 */

export async function LoginWithEmail(param:LoginWithEmailParam){
    return await axios.request<LoginWithEmailResponse>({
        method: 'post',
        url: REGISTRATION_ENDPOINT,
        headers: {
            'Content-Type': 'application/json',
        },
        data: param,
        validateStatus: () => true
    });
}

export async function VerifyLoginRequest(param:VerifyLoginRequestParam){
    return await axios.request<VerifyLoginRequestResponse>({
        method: 'post',
        url: composeUrl(`${REGISTRATION_ENDPOINT}/verify`, param),
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: () => true
    });
}

export async function GetAllProjects(param:GetAllProjectsParam){
    const {bearer, ...query} = param;

    return await axios.request<GetAllProjectsResponse>({
        method: 'get',
        url: composeUrl(PROJECTS_ENDPOINT_V8, query),
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
        url: composeUrl(`${PROJECTS_ENDPOINT_V8}/${idOrName}`, query),
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
        url: composeUrl(`${PROJECTS_ENDPOINT_V8}/${idOrName}`, query),
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

export async function CreateDeployment(param:CreateDeploymentParams){
    const {bearer, ...body} = param;
    return await axios.request<CreateDeploymentResponse>({
        method: 'post',
        url: composeUrl(DEPLOYMENTS_ENDPOINT_V13, {forceNew: !!param.forceNew ? 1 : 0}),
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
        url: composeUrl(`${DEPLOYMENTS_ENDPOINT_V13}/${param.id}`, query),
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
        url: composeUrl(`${DEPLOYMENTS_ENDPOINT_V12}/${param.id}/cancel`, {teamId:param.teamId}),
        headers: {
            Authorization: `BEARER ${param.bearer}`,
            'Content-Type': 'application/json',
        },
        validateStatus: () => true
    });
}
