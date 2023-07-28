import { Construct } from "constructs";
import { Role } from "aws-cdk-lib/aws-iam";

export const importRole = (app: Construct, roleId: string, roleName: string): any => {
    const importedRole = Role.fromRoleArn(app, roleId, `arn:aws:iam::974775373655:role/${roleName}`, { mutable: true }) as any;

    return importedRole;
};
