
import 'dotenv/config';
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import { getFilePathsInDirectory } from './files';
import {VercelFile} from "../types/VercelFile";
import {
    CreateProject,
    GetAllProjects,
    ViewDeployments,
    GetDeploymentByIdOrUrl,
    DeleteDeployment,
    CreateDeployment
} from "./../index";

const vercelToken = process.env.VERCEL_TOKEN as string;

(async ()=>{
    const allProjects = await GetAllProjects({
        bearer: vercelToken as string,
        search: "sample-api-project-a"
    });

    if (allProjects.status !== 200) {
        console.error('Failed to list projects', allProjects.statusText);
        return;
    }

    console.log('Got projects...', allProjects.data.projects.length);

    let projectId:string;

    if (allProjects.data.projects.length === 1){
        projectId = allProjects.data.projects[0].id;
    }
    else {
        console.log('Creating project...');
        const project = await CreateProject({
            bearer: vercelToken,
            name: 'sample-api-project-a'
        });

        if (project.status !== 200){
            console.error('Something went wrong', project.statusText);
            return;
        }
        console.log('Done creating project.');

        projectId = project.data.id;
    }

    console.log('Listing deployments...');

    const deploymentList = await ViewDeployments({
        bearer: vercelToken,
        projectId: projectId // "prj_7rP4q5KMNosSxEJa9DznDJD6fE58",
    });

    if (deploymentList.status !== 200) {
        console.error('Failed to list deployments', deploymentList.statusText);
        return;
    }

    const deploymentCount = deploymentList.data.deployments.length;
    console.log(`Got ${deploymentCount} deployments`);

    if (deploymentCount > 2){
        console.log('Too many deployments. deleting last few...');

        for (let index = 0; index < deploymentList.data.deployments.length; index++) {
            if (deploymentCount - index > 2){
                const deploymentInfo = deploymentList.data.deployments[index];
                console.log('Removing deployment', deploymentInfo.uid, deploymentInfo.url);
                await DeleteDeployment({
                    id: deploymentInfo.uid,
                    bearer: vercelToken
                }).catch(err => {
                    console.error(err);
                });
            }
        }
    }

    console.log('Creating Deployments...');

    const sampleDir = resolve("./src/sample/fs/");
    const filePaths = (await getFilePathsInDirectory(sampleDir)).map(path => path.replace(sampleDir, ''));

    const deploy = await CreateDeployment({
        bearer: vercelToken as string,
        projectId: projectId,
        target: "production",
        files: (await Promise.all(filePaths.map(async (path:string) => {
            const entryPath = join(sampleDir, path);
            return {
                file: path,
                data: (await readFile(entryPath, {encoding: 'base64'})),
                encoding: 'base64'
            } as VercelFile
        }))).filter(n => n !== null)
    });

    if (deploy.status !== 200) {
        console.error('Failed to deploy', deploy.statusText);
        return;
    }

    console.log('Deployed.');

    const deploymentInfo = await GetDeploymentByIdOrUrl({
        bearer: vercelToken,
        idOrUrl: deploy.data.url
    });

    if (deploymentInfo.status !== 200) {
        console.error('Failed to fetch deployment details', deploymentInfo.statusText);
        return;
    }

    console.log('Deployment check complete.', deploymentInfo.data.readyState);
})();