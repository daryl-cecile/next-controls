import { readdir } from "fs/promises";
import { resolve, join } from "path";

export async function getFilePathsInDirectory(directory:string):Promise<string[]>{
    const itemPaths = await readdir(directory, {withFileTypes: true});
    const collection = [];

    for (let item of itemPaths){
        const itemPath = resolve(join(directory, item.name));
        if (item.isFile()){
            collection.push( itemPath );
        }
        else if (item.isDirectory()) {
            collection.push( ...await getFilePathsInDirectory(itemPath) )
        }
    }

    return collection;
}