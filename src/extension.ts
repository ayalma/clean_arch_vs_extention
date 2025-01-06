
import * as vscode from 'vscode';
import { newInteractor, newView } from './commands';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "clean-arch-vs" is now active!');
	context.subscriptions.push(
		vscode.commands.registerCommand('clean-arch-vs.new_interactor',newInteractor),
		vscode.commands.registerCommand('clean-arch-vs.new_view',newView)
	);

	
	const disposable = vscode.commands.registerCommand('clean-arch-vs.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from clean_arch_vs!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
