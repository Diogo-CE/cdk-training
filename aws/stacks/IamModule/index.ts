import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RolesModule } from "./infra";

export class IamModule extends Stack {
    constructor(app: Construct, name: string, props?: StackProps) {
        super(app, name, props);
        new RolesModule(this, 'RolesModule');
    };
};
