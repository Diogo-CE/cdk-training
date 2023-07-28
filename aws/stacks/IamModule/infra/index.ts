import { Construct } from "constructs";
import { makeFullAcessRole } from "./lambda/full-access";

export class RolesModule extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        makeFullAcessRole(this);
    };
};
