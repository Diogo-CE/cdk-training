import { Construct } from "constructs";
import { Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { importLambda } from "../../helpers/import-lambda";

export function makeMainApi(app: Construct) {
    const mainApi = new RestApi(app, 'MainApi', {
        restApiName: 'CDK-Training',
        defaultCorsPreflightOptions: {
            allowOrigins: Cors.ALL_ORIGINS,
        },
        deploy: true
    });

    const cart = mainApi.root.addResource('cart');
    const checkout = cart.addResource('checkout');
    const delivery = cart.addResource('delivery');
    const products = mainApi.root.addResource('products');
    const search = products.addResource('search');

    cart.addMethod('GET', new LambdaIntegration(importLambda(app, 'modules.lambda.api.get-viewCart')));
    cart.addMethod('POST', new LambdaIntegration(importLambda(app, 'modules.lambda.api.post-addProductsToCart')));
    checkout.addMethod('DELETE', new LambdaIntegration(importLambda(app, 'modules.lambda.api.delete-checkout')));
    delivery.addMethod('GET', new LambdaIntegration(importLambda(app, 'modules.lambda.api.get-calculateDelivery')));
    products.addMethod('GET', new LambdaIntegration(importLambda(app, 'modules.lambda.api.get-listProducts')));
    search.addMethod('GET', new LambdaIntegration(importLambda(app, 'modules.lambda.api.get-searchProductsByName')));
};
