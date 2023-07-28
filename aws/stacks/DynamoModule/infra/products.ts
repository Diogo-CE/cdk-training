import { Construct } from "constructs";
import { Table, AttributeType, StreamViewType, BillingMode } from "aws-cdk-lib/aws-dynamodb"; 
import { ParameterTier, ParameterDataType, StringParameter } from "aws-cdk-lib/aws-ssm";

export function makeProductsTable(app: Construct) {
    const resource = new Table(app, 'ProductsTable', {
        tableName: 'CDK-products',
        partitionKey: { name: 'id', type: AttributeType.NUMBER },
        stream: StreamViewType.NEW_AND_OLD_IMAGES,
        billingMode: BillingMode.PAY_PER_REQUEST,
        pointInTimeRecovery: true
    });

    new StringParameter(app, 'modules.products.dynamodb.table.products', {
        parameterName: 'modules.dynamodb.tables.products',
        stringValue: resource.tableName,
        dataType: ParameterDataType.TEXT,
        tier: ParameterTier.STANDARD
    });

    return resource;
};
