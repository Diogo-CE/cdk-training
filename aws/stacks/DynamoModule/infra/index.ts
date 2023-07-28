import { Construct } from "constructs";
import { makeCartTable } from "./cart";
import { makeProductsTable } from "./products";
import { makeSalesTable } from "./sales";

export class TablesModule extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        makeCartTable(this);
        makeProductsTable(this);
        makeSalesTable(this);
    };
};
