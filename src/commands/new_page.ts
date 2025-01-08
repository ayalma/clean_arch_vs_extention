import { InputBoxOptions, Uri, window } from "vscode";
import * as changeCase from "change-case";
import * as _ from "lodash";
import { existsSync, lstatSync, writeFile } from "fs";
import { createDirectory, promptForTargetDirectory } from "../utils/utils";
import { getInjectorTemplate, getPageTemplate, getPresenterTemplate, getScreenTemplate, getViewBurrialExportTemplate, getViewModelTemplate, getViewWidgetTemplate } from "../templates";

export const newPage = async (uri: Uri) => {
    const pageName = await promptForPageName();
    if (_.isNil(pageName) || pageName.trim() === "") {
        window.showErrorMessage("The page name must not be empty");
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

    const pascalCaseViewName = changeCase.pascalCase(pageName.toLowerCase());
    try {
        await generatePageCode(pageName, targetDirectory);

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

function promptForPageName(): Thenable<string | undefined> {
    const pageNamePromptOptions: InputBoxOptions = {
        prompt: "page name",
        placeHolder: "page"
    };

    return window.showInputBox(pageNamePromptOptions);
}


async function generatePageCode(
    pageName: string,
    targetDirectory: string,
) {
    const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
    const baseDirectoryPath =
        `${targetDirectory}/${snakeCasePageName}`;
    if (!existsSync(baseDirectoryPath)) {
        await createDirectory(baseDirectoryPath);
    }

    const pageDirectoryPath = `${baseDirectoryPath}/page`;
    if (!existsSync(pageDirectoryPath)) {
        await createDirectory(pageDirectoryPath);
    }

    const viewDirectoryPath = `${baseDirectoryPath}/views`;
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
       
        createPageBurrialExportTemplate(pageName, baseDirectoryPath),
        createPageTemplate(pageName,pageDirectoryPath),
        createInjectorTemplate(pageName,pageDirectoryPath),
        createScreenTemplate(pageName,pageDirectoryPath),
        createPresenterTemplate(pageName, presenterDirectoryPath),
        createViewModelTemplate(pageName, viewModelDirectoryPath),
        createViewTemplate(pageName,viewDirectoryPath)
        // createInputTemplate(interactorName, interactorDirectoryPath),
        // createOutputTemplate(interactorName, interactorDirectoryPath),
        // createOutputPortContractTemplate(interactorName, interactorDirectoryPath),
        // createInputPortContractTemplate(interactorName, interactorDirectoryPath),
        // createInputPortConcreteTemplate(interactorName, interactorDirectoryPath),

    ]);



    function createPageBurrialExportTemplate(
        pageName: string,
        targetDirectory: string,
    ) {
        const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCasePageName}.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCasePageName}.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getViewBurrialExportTemplate(pageName),
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
        pageName: string,
        targetDirectory: string,
    ) {
        const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCasePageName}_presenter.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCasePageName}_presenter.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getPresenterTemplate(pageName),
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
        pageName: string,
        targetDirectory: string,
    ) {
        const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCasePageName}_viewmodel.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCasePageName}_viewmodel.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getViewModelTemplate(pageName),
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
        pageName: string,
        targetDirectory: string,
    ) {
        const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCasePageName}_view.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCasePageName}_view.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getViewWidgetTemplate(pageName),
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


    function createPageTemplate(
        pageName: string,
        targetDirectory: string,
    ) {
        const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCasePageName}_page.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCasePageName}_page.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getPageTemplate(pageName),
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

    function createInjectorTemplate(
        pageName: string,
        targetDirectory: string,
    ) {
        const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCasePageName}_injector.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCasePageName}_injector.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getInjectorTemplate(pageName),
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

    function createScreenTemplate(
        pageName: string,
        targetDirectory: string,
    ) {
        const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
        const targetPath = `${targetDirectory}/${snakeCasePageName}_screen.dart`;
        if (existsSync(targetPath)) {
            throw Error(`${targetDirectory}/${snakeCasePageName}_screen.dart already exists`);
        }
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getScreenTemplate(pageName),
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
