import * as changeCase from "change-case";

export function getPageTemplate(pageName: String) {
    const paccalCasePageName = changeCase.pascalCase(pageName.toLowerCase());
    const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
    return `import 'package:flutter/material.dart';

import '${snakeCasePageName}_injector.dart';

class ${paccalCasePageName}Page extends StatelessWidget {
    const ${paccalCasePageName}Page({super.key});
    static const String route = '${snakeCasePageName}';

    @override
    Widget build(BuildContext context) {
        return const ${paccalCasePageName}Injector();
    }
}

`
}

export function getInjectorTemplate(pageName: String) {
    const paccalCasePageName = changeCase.pascalCase(pageName.toLowerCase());
    const snakeCasePageName = changeCase.snakeCase(pageName.toLowerCase());
    return `import 'package:flutter/material.dart';

import '${snakeCasePageName}_screen.dart';

class ${paccalCasePageName}Injector extends StatefulWidget {
    const ${paccalCasePageName}Injector({super.key});

    @override
    State<${paccalCasePageName}Injector> createState() => _${paccalCasePageName}InjectorState();
}

class _${paccalCasePageName}InjectorState extends State<${paccalCasePageName}Injector> {
    @override
    void initState() {
        // TODO: init getit scope here
        super.initState();
    }
    
    @override
    void dispose() {
        // TODO: dispose getit scope here
        super.dispose();
    }
    
    @override
    Widget build(BuildContext context) {
        //TODO: Create proper injector here like ChangeNotifierProvider or other provider , only for this page
        return const ${paccalCasePageName}Screen();
    }
}
`
}

export function getScreenTemplate(pageName: String) {
    const paccalCasePageName = changeCase.pascalCase(pageName.toLowerCase());
    return `
import 'package:flutter/material.dart';

class ${paccalCasePageName}Screen extends StatelessWidget {
  const ${paccalCasePageName}Screen({super.key});

  @override
  Widget build(BuildContext context) {
    //TODO: create page widget tree here.
    return Container();
  }
}

`
}