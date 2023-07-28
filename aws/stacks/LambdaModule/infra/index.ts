import { Construct } from "constructs";
import { makeAddProductsToCart } from "./addProductsToCart";
import { makeCalculateDelivery } from "./calculateDelivery";
import { makeCheckout } from "./checkout";
import { makeListProducts } from "./listProducts";
import { makeSearchProductsByName } from "./searchProductsByName";
// import { makeSqsCheckout } from "./sqsCheckout";
import { makeViewCart } from "./viewCart";

export class FunctionsModule extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        makeAddProductsToCart(this);
        makeCalculateDelivery(this);
        makeCheckout(this);
        makeListProducts(this);
        makeSearchProductsByName(this);
        makeViewCart(this);
    };
};

// export class SqsFunctionsModule extends Construct {
//     constructor(scope: Construct, id: string) {
//         super(scope, id);
//         makeSqsCheckout(this);
//     };
// };
