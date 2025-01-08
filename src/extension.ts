
import * as vscode from 'vscode';
import { newInteractor, newPage, newView } from './commands';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "clean-arch-vs" is now active!');
	context.subscriptions.push(
		vscode.commands.registerCommand('clean-arch-vs.new_interactor', newInteractor),
		vscode.commands.registerCommand('clean-arch-vs.new_view', newView),
		vscode.commands.registerCommand('clean-arch-vs.new_page', newPage)
	);
}

export function deactivate() { }
