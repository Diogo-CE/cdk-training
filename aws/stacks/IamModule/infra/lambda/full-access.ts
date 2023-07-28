import { Construct } from "constructs";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { ParameterTier, StringParameter, ParameterDataType } from "aws-cdk-lib/aws-ssm";

export function makeFullAcessRole(app: Construct) {
    const lambdaRole = new Role(app, 'fullAccessRole', {
        roleName: 'CDK-Training@Lambda=FullAccess',
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        description: 'Acesso de administrador',
        managedPolicies: [
            ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')
        ]
    });

    new StringParameter(app, 'modules.iam.lambda.full-access', {
        parameterName: 'modules.iam.lambda.full-access',
        stringValue: lambdaRole.roleArn,
        dataType: ParameterDataType.TEXT,
        tier: ParameterTier.STANDARD
    });
};
