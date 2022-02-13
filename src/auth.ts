import axios from "axios";
import {REGISTRATION_ENDPOINT} from "./constants";
import {VerifyLoginRequestResponse} from "./types/VerifyLoginRequestResponse";
import {LoginWithEmailParam, VerifyLoginRequestParam} from "./types/types";
import {LoginWithEmailResponse} from "./types/LoginWithEmailResponse";

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
		url: `${REGISTRATION_ENDPOINT}/verify`,
		params: param,
		headers: {
			'Content-Type': 'application/json',
		},
		validateStatus: () => true
	});
}
