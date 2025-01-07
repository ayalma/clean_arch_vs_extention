import { InputBoxOptions, Uri, window } from "vscode";
import * as changeCase from "change-case";
import * as _ from "lodash";
import { existsSync, lstatSync, writeFile } from "fs";
import { createDirectory, promptForTargetDirectory } from "../utils/utils";
import { getPresenterTemplate, getViewBurrialExportTemplate, getViewModelTemplate, getViewWidgetTemplate } from "../templates";

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
    viewName: string,
    targetDirectory: string,
) {
    const snakeCaseViewName = changeCase.snakeCase(viewName.toLowerCase());
    const baseDirectoryPath =
        `${targetDirectory}/${snakeCaseViewName}`;
    if (!existsSync(baseDirectoryPath)) {
        await createDirectory(baseDirectoryPath);
    }

    const viewDirectoryPath = `${baseDirectoryPath}/view`;
    if (!existsSync(viewDirectoryPath)) {
        await createDirectory(viewDirectoryPath);
    }

    const presenterDirectoryPath = `${baseDirectoryPath}/presenter`;
    if (!existsSync(presenterDirectoryPath)) {
        await createDirectory(presenterDirectoryPath);
    }

    const viewModelDirectoryPath = `${baseDirectoryPath}/viewmodel`;
    if (!existsSync(viewModelDirectoryPath)) {
        await createDirectory(viewModelDirectoryPath);
    }



    await Promise.all([
        createViewBurrialExportTemplate(viewName, baseDirectoryPath),
        createPresenterTemplate(viewName, presenterDirectoryPath),
        createViewModelTemplate(viewName, viewModelDirectoryPath),
        createViewTemplate(viewName,viewDirectoryPath)
        // createInputTemplate(interactorName, interactorDirectoryPath),
        // createOutputTemplate(interactorName, interactorDirectoryPath),
        // createOutputPortContractTemplate(interactorName, interactorDirectoryPath),
        // createInputPortContractTemplate(interactorName, interactorDirectoryPath),
        // createInputPortConcreteTemplate(interactorName, interactorDirectoryPath),

    ]);



    function createViewBurrialExportTemplate(
        viewName: string,
        targetDirectory: string,
    ) {
        const snakeCaseViewName = changeCase.snakeCase(viewName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCaseViewName}.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCaseViewName}.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getViewBurrialExportTemplate(viewName),
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
    function createPresenterTemplate(
        viewName: string,
        targetDirectory: string,
    ) {
        const snakeCaseViewName = changeCase.snakeCase(viewName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCaseViewName}_presenter.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCaseViewName}_presenter.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getPresenterTemplate(viewName),
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

    function createViewModelTemplate(
        viewName: string,
        targetDirectory: string,
    ) {
        const snakeCaseViewName = changeCase.snakeCase(viewName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCaseViewName}_viewmodel.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCaseViewName}_viewmodel.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getViewModelTemplate(viewName),
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

    function createViewTemplate(
        viewName: string,
        targetDirectory: string,
    ) {
        const snakeCaseViewName = changeCase.snakeCase(viewName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCaseViewName}_view.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCaseViewName}_view.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getViewWidgetTemplate(viewName),
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
}
