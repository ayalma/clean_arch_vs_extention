import { InputBoxOptions, Uri, window } from "vscode";
import * as changeCase from "change-case";
import * as _ from "lodash";
import { existsSync, lstatSync } from "fs";
import { createDirectory, promptForTargetDirectory } from "../utils/utils";

export const newView = async (uri: Uri) => {
    const viewName = await promptForViewName();
    if (_.isNil(viewName) || viewName.trim() === "") {
        window.showErrorMessage("The view name must not be empty");
        return;
    }

    let targetDirectory: string;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        let tempDirectoryNamey = await promptForTargetDirectory("view");
        if (_.isNil(tempDirectoryNamey) || tempDirectoryNamey === undefined) {
            window.showErrorMessage("Please select a valid directory");
        }
        targetDirectory = tempDirectoryNamey as string;
    }
    else {
        targetDirectory = uri.fsPath;
    }

    const pascalCaseViewName = changeCase.pascalCase(viewName.toLowerCase());
    try {
        await generateViewCode(viewName, targetDirectory);

        window.showInformationMessage(
            `Successfully Generated ${pascalCaseViewName} View in ${targetDirectory}`
        );
    } catch (error) {
        window.showErrorMessage(
            `Error:
          ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
}

function promptForViewName(): Thenable<string | undefined> {
    const viewNamePromptOptions: InputBoxOptions = {
        prompt: "view name",
        placeHolder: "view"
    };

    return window.showInputBox(viewNamePromptOptions);
}


async function generateViewCode(
    interactorName: string,
    targetDirectory: string,
) {
    const snakeCaseViewName = changeCase.snakeCase(interactorName.toLowerCase());
    const interactorDirectoryPath =
        `${targetDirectory}/${snakeCaseViewName}`;
    if (!existsSync(interactorDirectoryPath)) {
        await createDirectory(interactorDirectoryPath);
    }

    await Promise.all([
        // createInputTemplate(interactorName, interactorDirectoryPath),
        // createOutputTemplate(interactorName, interactorDirectoryPath),
        // createOutputPortContractTemplate(interactorName, interactorDirectoryPath),
        // createInputPortContractTemplate(interactorName, interactorDirectoryPath),
        // createInputPortConcreteTemplate(interactorName, interactorDirectoryPath),

    ]);
}
