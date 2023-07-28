import { Construct } from "constructs";
import { makeMainApi } from "./main";

export class ApisModule extends Construct {
    constructor (scope: Construct, id: string) {
        super(scope, id);
        makeMainApi(this);
    };
};
