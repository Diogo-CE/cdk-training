import { Construct } from "constructs";
import { Table, AttributeType, StreamViewType, BillingMode } from "aws-cdk-lib/aws-dynamodb"; 
import { ParameterTier, ParameterDataType, StringParameter } from "aws-cdk-lib/aws-ssm";

export function makeSalesTable(app: Construct) {
    const resource = new Table(app, 'SalesTable', {
        tableName: 'CDK-sales',
        partitionKey: { name: 'user', type: AttributeType.STRING },
        sortKey: { name: 'datetime', type: AttributeType.STRING },
        stream: StreamViewType.NEW_AND_OLD_IMAGES,
        billingMode: BillingMode.PAY_PER_REQUEST,
        pointInTimeRecovery: true
    });

    new StringParameter(app, 'modules.sales.dynamodb.table.sales', {
        parameterName: 'modules.dynamodb.tables.sales',
        stringValue: resource.tableName,
        dataType: ParameterDataType.TEXT,
        tier: ParameterTier.STANDARD
    });

    return resource;
};
