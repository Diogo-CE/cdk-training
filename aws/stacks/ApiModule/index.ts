import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApisModule } from "./infra";

export class ApiModule extends Stack {
    constructor(app: Construct, name: string, props?: StackProps) {
        super(app, name, props);
        new ApisModule(this, 'ApisModule');
    };
};
