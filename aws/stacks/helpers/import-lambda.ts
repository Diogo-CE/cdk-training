import { Construct } from "constructs";
import { Function } from "aws-cdk-lib/aws-lambda";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export const importLambda = (app: Construct, parameterId: string): Function => {
    const lambdaArn = StringParameter.fromStringParameterName(
        app,
        parameterId,
        parameterId
    ).stringValue;

    const lambda = Function.fromFunctionAttributes(app, `${parameterId}:ParameterStore`, {
        sameEnvironment: true,
        functionArn: lambdaArn
    }) as Function;

    return lambda;
}
