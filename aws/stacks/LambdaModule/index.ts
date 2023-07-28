import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { FunctionsModule /* , SqsFunctionsModule */ } from "./infra";

export class LambdaModule extends Stack {
    constructor(app: Construct, name: string, props?: StackProps) {
        super(app, name, props);
        new FunctionsModule(this, 'FunctionsModule');
        // new SqsFunctionsModule(this, 'SqsFunctionsModule');
    };
};
