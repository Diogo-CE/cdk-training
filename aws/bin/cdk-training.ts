#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiModule, DynamoModule, IamModule, LambdaModule /* , SqssModule */ } from '../stacks';

const env = {
    region: 'us-east-2'
};

const app = new cdk.App();

new ApiModule(app, 'ApiStack', { env });
new DynamoModule(app, 'DynamoStack', { env });
new IamModule(app, 'IamStack', { env });
new LambdaModule(app, 'LambdaStack', { env });
// new SqssModule(app, 'SqsStack', { env });

app.synth();
