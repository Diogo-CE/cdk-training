import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { TablesModule } from "./infra";

export class DynamoModule extends Stack {
    constructor(app: Construct, name: string, props?: StackProps) {
        super(app, name, props);
        new TablesModule(this, 'TablesModule');
    };
};
