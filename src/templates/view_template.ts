import * as changeCase from "change-case";

export function getViewBurrialExportTemplate(interactorName: String) {
    const paccalCaseViewName = changeCase.pascalCase(interactorName.toLowerCase());
    return `
    ///
    /// Burial  export file 
    /// export neaded file for [${paccalCaseViewName}]
    ///
    `
}

export function getPresenterTemplate(interactorName: String) {
    const paccalCaseViweName = changeCase.pascalCase(interactorName.toLowerCase());
    const camelCaseCaseViewName = changeCase.camelCase(interactorName.toLowerCase());
    const snakeCaseCaseViewName = changeCase.snakeCase(interactorName.toLowerCase());


    return `
    import '../viewmodel/${snakeCaseCaseViewName}_viewmodel.dart';

    class ${paccalCaseViweName}Presenter implements ${paccalCaseViweName}OutputPort{
        final ${paccalCaseViweName}ViewModel _${camelCaseCaseViewName}ViewModel;

        ${paccalCaseViweName}Presenter({required ${paccalCaseViweName}ViewModel ${camelCaseCaseViewName}ViewModel})
            : _${camelCaseCaseViewName}ViewModel = ${camelCaseCaseViewName}ViewModel;

        @override
        Future<void> onComplate(${paccalCaseViweName}Output output) {
          // TODO: implement onComplate
          throw UnimplementedError();
        }
      
        @override
        Future<void> onFailure() {
          // TODO: implement onFailure
          throw UnimplementedError();
        }
      
        @override
        Future<void> onStart({${paccalCaseViweName}Output? output}) {
          // TODO: implement onStart
          throw UnimplementedError();
        }
      
      }
    `
}

export function getViewModelTemplate(interactorName: String) {
    const paccalCaseViweName = changeCase.pascalCase(interactorName.toLowerCase());
    return `
    class ${paccalCaseViweName}ViewModel implements ChangeNotifier{
        
      }
    `
}

export function getViewWidgetTemplate(interactorName: String) {
    const paccalCaseViweName = changeCase.pascalCase(interactorName.toLowerCase());
    return `
    import 'package:flutter/material.dart';

    class ${paccalCaseViweName}View extends StatelessWidget {
        const ${paccalCaseViweName}View({super.key});

        @override
        Widget build(BuildContext context) {
            // TODO: implement build
            throw UnimplementedError();
        }
    }

    `
}