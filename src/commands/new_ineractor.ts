import { InputBoxOptions, Uri, window } from "vscode";
import * as changeCase from "change-case";
import * as _ from "lodash";
import { existsSync, lstatSync, writeFile } from "fs";
import { getInputPortConcreteTemplate, getInputPortContractTemplate, getInputTemplate, getOutputPortContractTemplate, getOutputTemplate } from "../templates";
import { createDirectory, promptForTargetDirectory } from "../utils/utils";


export const newInteractor = async (uri: Uri) => {

    const interactorName = await promptForInteractorName();
    if (_.isNil(interactorName) || interactorName.trim() === "") {
        window.showErrorMessage("The view name must not be empty");
        return;
    }

    let targetDirectory: string;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        let tempDirectoryNamey = await promptForTargetDirectory("interactor");
        if (_.isNil(tempDirectoryNamey) || tempDirectoryNamey === undefined) {
            window.showErrorMessage("Please select a valid directory");
        }
        targetDirectory = tempDirectoryNamey as string;
    }
    else {
        targetDirectory = uri.fsPath;
    }

    const pascalCaseInteractorName = changeCase.pascalCase(interactorName.toLowerCase());
    try {
        await generateInteractorCode(interactorName, targetDirectory);

        window.showInformationMessage(
            `Successfully Generated ${pascalCaseInteractorName} Interactor in ${targetDirectory}`
        );
    } catch (error) {
        window.showErrorMessage(
            `Error:
          ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
}

function promptForInteractorName(): Thenable<string | undefined> {
    const interactorNamePromptOptions: InputBoxOptions = {
        prompt: "interactor name",
        placeHolder: "interactor"
    };

    return window.showInputBox(interactorNamePromptOptions);
}



async function generateInteractorCode(
    interactorName: string,
    targetDirectory: string,
) {
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    const interactorDirectoryPath =
        `${targetDirectory}/${snakeCaseInteractorName}`;
    if (!existsSync(interactorDirectoryPath)) {
        await createDirectory(interactorDirectoryPath);
    }

    await Promise.all([
        createInputTemplate(interactorName, interactorDirectoryPath),
        createOutputTemplate(interactorName, interactorDirectoryPath),
        createOutputPortContractTemplate(interactorName, interactorDirectoryPath),
        createInputPortContractTemplate(interactorName, interactorDirectoryPath),
        createInputPortConcreteTemplate(interactorName, interactorDirectoryPath),
        // createViewTemplate(viewName, viewDirectoryPath),
        // createOrientationTemplate(viewName, mobileDirectoryPath, "mobile"),
        // createScreenTemplate(viewName, mobileDirectoryPath, "mobile", "landscape"),
        // createScreenTemplate(viewName, mobileDirectoryPath, "mobile", "portrait"),

        // createOrientationTemplate(viewName, tabletDirectoryPath, "tablet"),
        // createScreenTemplate(viewName, tabletDirectoryPath, "tablet", "landscape"),
        // createScreenTemplate(viewName, tabletDirectoryPath, "tablet", "portrait"),

        // createOrientationTemplate(viewName, desktopDirectoryPath, "desktop"),
        // createScreenTemplate(viewName, desktopDirectoryPath, "desktop", "landscape"),
        // createScreenTemplate(viewName, desktopDirectoryPath, "desktop", "portrait"),
        // createBlocStateTemplate(viewName, targetDirectory, type),
        // createBlocTemplate(viewName, targetDirectory, type),
    ]);
}


function createOutputPortContractTemplate(
    interactorName: string,
    targetDirectory: string,
) {
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseInteractorName}_output_port.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseInteractorName}_output_port.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getOutputPortContractTemplate(interactorName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}

function createInputPortContractTemplate(
    interactorName: string,
    targetDirectory: string,
) {
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseInteractorName}_input_port.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseInteractorName}_input_port.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getInputPortContractTemplate(interactorName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}


function createInputPortConcreteTemplate(
    interactorName: string,
    targetDirectory: string,
) {
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseInteractorName}_input_port_impl.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseInteractorName}_input_port_impl.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getInputPortConcreteTemplate(interactorName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}

function createInputTemplate(
    interactorName: string,
    targetDirectory: string,
) {
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseInteractorName}_input.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseInteractorName}_input.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getInputTemplate(interactorName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}



function createOutputTemplate(
    interactorName: string,
    targetDirectory: string,
) {
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseInteractorName}_output.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseInteractorName}_output.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getOutputTemplate(interactorName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}
