<p align="center">
   <br/>
   <h3 align="center">Next-Controls</h3>
   <p align="center">
   Typescript Wrapper For Next.js APIs
   </p>
   <p align="center" style="align: center;">
      <a href="https://packagephobia.com/result?p=@darylcecile/next-controls">
        <img src="https://packagephobia.com/badge?p=@darylcecile/next-controls" alt="Bundle Size"/>
      </a>
      <a href="https://www.npmjs.com/package/@darylcecile/next-controls">
        <img src="https://img.shields.io/github/v/release/daryl-cecile/next-controls?label=latest" alt="Github Stable Release" />
      </a>
   </p>
</p>

---

## Overview

Next-Controls is a wrapper library for [Next.js](http://nextjs.org/) APIs. Currently under early development, only a limited selection
of endpoints are supported, but PRs are welcome.

The methods provided make use of properties defined in the Vercel docs; see those for more info on what each required property is.

#### Progress:
- Deployments - [partial]
- Auth - [partial]
- Secrets - [complete]
- Projects - [partial]
- Log Drain - [todo]  
- Domains - [todo]  
- Aliases - [todo]  
- Artifact - [todo - beta]  

### Local Development

To get going after pulling the repo locally:
1. Create a copy of the _.env.sample_ file called _.env_, and set your `VERCEL_TOKEN` value.
2. Make your changes
3. Run `yarn build` or `npm run build` to create the esm and cjs variants.

That's all there is to it; I've left this project simple in structure, and un-opinionated for now. Tests are my next priority (Read [my blog post](https://darylcecile.net/notes/vercel-doc-journey) to find out how I ended up with this repo to begin with).

### Using in your project

To begin using this in your project, first install it into your project: 
```bash
yarn add @darylcecile/next-controls
# or 
npm i @darylcecile/next-controls --save.
```

then import it into your work:
```typescript
import {CreateProject} from "@darylcecile/next-controls";

// ...
```

The methods all return a `Promise` of `AxiosRequest`, with each request data being typed (see `./src/types/` folder for type definitions).

**🚨NOTE** This library only contains a small subset of what the Vercel API supports. I've only added what I found I needed for my use-case, but plan on expanding to cover all APIs in the future. In the meantime, PRs are welcome to add more wrapper methods.

#### Create Deployment

Create a deployment on the specified project; provided files will be uploaded for deployment.

```typescript
CreateDeployment({
	bearer: '...',
	projectId: '...',
	files: [
		{
			file: '<fileName>',
			data: '...', // optional
			sha: '...', // optional
			size: 0, // optional
			encoding: 'base64' // optional
        },
        // {...}
    ],
	forceNew: false, // optional - see Vercel docs
	target: "staging", // optional - "staging" (default) or "production"
	meta: {
		key: 'value',
        // ...
    }
})

// returns -> Promise<AxiosResponse>
```
---

#### Get Deployment By ID or URL

Finds a deployment by deploymentId or URL. Bearer optional (see [vercel docs](https://vercel.com/docs/rest-api#endpoints/deployments/get-a-deployment-by-id-or-url)).
```typescript
GetDeploymentByIdOrUrl({
	bearer: '...', // optional
	idOrUrl: '...'
});

// returns -> Promise<AxiosResponse>
```
---

#### Delete a Deployment

Delete a deployment by ID or URL.

```typescript
DeleteDeployment({
	bearer: '...',
	id: '...', //deployment ID
	teamId: '...', //optional - for team-project deployment
	url: '...' //optional - if provided will ignore id
});

// returns -> Promise<AxiosResponse>
```
---

#### View Deployment Details

Get deployment details for a specific project

```typescript
ViewDeployments({
	bearer: '...',
	projectId: '...'
});

// returns -> Promise<AxiosResponse>
```
---

#### Cancel a deployment

Cancel an ongoing deployment for a specific project

```typescript
CancelDeployment({
	bearer: '...',
	id: '...', // deployment ID
	teamId: '...' //optional - for team project
});

// returns -> Promise<AxiosResponse>
```
---

#### Get all Projects

Get a list of all projects.

```typescript
GetAllProjects({
	bearer: '...',
	from: 9999999999, // optional - timestamp
	limit: 0, // optional - count
	search: '...', //optional - filter
	teamId: '...' //optional - for team projects
});

// returns -> Promise<AxiosResponse>
```
---

#### Delete a Project

Delete a project by ID or Name.

```typescript
DeleteProject({
	bearer: '...',
	idOrName: '...', // project unique ID or Name
	teamId: '...' //optional - if its a team project
});

// returns -> Promise<AxiosResponse>
```
---

#### Create a new Project

Create a project. Supported frameworks can be found on [vercel doc](https://vercel.com/docs/rest-api#endpoints/projects/create-a-new-project).

```typescript
CreateProject({
	bearer: '...',
	name: '...', // project name
	environmentVariables: ['ENV=val', '...'], //optional
    framework: "nextjs" //optional - see doc for up-to-date list of supported frameworks
});

// returns -> Promise<AxiosResponse>
```
---

#### Login with Email

As stated in vercel docs: _Request a new login for a user to get a token. This will respond with a verification token and send an email to confirm the request. Once confirmed you can use the verification token to get an authentication token._

```typescript
LoginWithEmail({
	email: '...', // user email
	tokenName: '...' //optional - name for the token
});

// returns -> Promise<AxiosResponse>
```
---

#### Verify email login request

As stated in vercel docs: _Verify the user accepted the login request and get a authentication token._

```typescript
VerifyLoginRequest({
	token: '...', // token received from above request
	email: '...', // user email
	tokenName: '...' //optional - name for the token
});

// returns -> Promise<AxiosResponse>
```
