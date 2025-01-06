import { OpenDialogOptions, window } from "vscode";
import * as _ from "lodash";
import { mkdirp } from "mkdirp";

export async function promptForTargetDirectory(title:string): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        openLabel: `Select a folder to create the ${title} in`,
        canSelectFolders: true,
    };

    return window.showOpenDialog(options).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}


export function createDirectory(targetDirectory: string): Promise<string | void | undefined> {
    return mkdirp(targetDirectory);
}