import {FieldDescriptorProto} from "google-protobuf/google/protobuf/descriptor_pb";
import {TplEngine} from "../../TplEngine";
import {Utility} from "../../Utility";
import {ExportMap} from "../../ExportMap";
import {FieldTypesFormatter} from "./FieldTypesFormatter";

export namespace ExtensionFormatter {

    export function format(fileName: string,
                           exportMap: ExportMap,
                           extension: FieldDescriptorProto,
                           indentLevel: number): string {

        let extensionName = Utility.snakeToCamel(extension.getName());
        if (extensionName === 'enum') {
            // 'enum' is a reserved keyword, and the JS plugin uses 'pb_enum' instead.
            extensionName = 'pb_enum';
        }

        let fieldType = FieldTypesFormatter.getFieldType(
            extension.getType(), extension.getTypeName().slice(1), fileName, exportMap
        );

        return TplEngine.render('partial/extension', {
            indent: Utility.generateIndent(indentLevel),
            extensionName: extensionName,
            fieldType: fieldType,
        });
    }

}