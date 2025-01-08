import * as changeCase from "change-case";


export function getInputPortContractTemplate(interactorName: String) {
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    const paccalCaseInteractorName = changeCase.pascalCase(interactorName.toLowerCase());
    return `import '${snakeCaseInteractorName}_output_port.dart';
import '${snakeCaseInteractorName}_input.dart';
    
abstract base class ${paccalCaseInteractorName}InputPort
{
    ${paccalCaseInteractorName}InputPort(${paccalCaseInteractorName}OutputPort outputPort);
    Future<void> call(${paccalCaseInteractorName}Input input);
}
`
}

export function getInputTemplate(interactorName: String) {
    const paccalCaseInteractorName = changeCase.pascalCase(interactorName.toLowerCase());
    return `class ${paccalCaseInteractorName}Input
{
    
}
`
}


export function getOutputPortContractTemplate(interactorName: String) {
    const paccalCaseInteractorName = changeCase.pascalCase(interactorName.toLowerCase());
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    return `import '${snakeCaseInteractorName}_output.dart';

abstract interface class ${paccalCaseInteractorName}OutputPort
{
    Future<void> onStart({${paccalCaseInteractorName}Output? output});
    Future<void> onFailure();
    Future<void> onComplate(${paccalCaseInteractorName}Output output);
}
`
}

export function getOutputTemplate(interactorName: String) {
    const paccalCaseInteractorName = changeCase.pascalCase(interactorName.toLowerCase());
    return `
class ${paccalCaseInteractorName}Output
{

}
`
}

export function getInputPortConcreteTemplate(interactorName: String) {
    const paccalCaseInteractorName = changeCase.pascalCase(interactorName.toLowerCase());
    const snakeCaseInteractorName = changeCase.snakeCase(interactorName.toLowerCase());
    return `import '${snakeCaseInteractorName}_input.dart';
import '${snakeCaseInteractorName}_input_port.dart';

final class ${paccalCaseInteractorName}InputPortImpl extends ${paccalCaseInteractorName}InputPort {
    ${paccalCaseInteractorName}InputPortImpl(super.outputPort);

    @override
    Future<void> call(${paccalCaseInteractorName}Input input) async{
        // TODO: implement call
        throw UnimplementedError();
    }
}      
`
}