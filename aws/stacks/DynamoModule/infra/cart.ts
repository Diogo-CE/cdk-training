import { Construct } from "constructs";
import { Table, AttributeType, StreamViewType, BillingMode } from "aws-cdk-lib/aws-dynamodb"; 
import { ParameterTier, ParameterDataType, StringParameter } from "aws-cdk-lib/aws-ssm";

export function makeCartTable(app: Construct) {
    const resource = new Table(app, 'CartTable', {
        tableName: 'CDK-cart',
        partitionKey: { name: 'username', type: AttributeType.STRING },
        sortKey: { name: 'id', type: AttributeType.NUMBER },
        stream: StreamViewType.NEW_AND_OLD_IMAGES,
        billingMode: BillingMode.PAY_PER_REQUEST,
        pointInTimeRecovery: true
    });

    new StringParameter(app, 'modules.cart.dynamodb.table.cart', {
        parameterName: 'modules.dynamodb.tables.cart',
        stringValue: resource.tableName,
        dataType: ParameterDataType.TEXT,
        tier: ParameterTier.STANDARD
    });

    return resource;
};
