import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  PutResourcePolicyInput,
  PutResourcePolicyOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface PutResourcePolicyCommandInput extends PutResourcePolicyInput {}
export interface PutResourcePolicyCommandOutput
  extends PutResourcePolicyOutput,
    __MetadataBearer {}
declare const PutResourcePolicyCommand_base: {
  new (
    input: PutResourcePolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutResourcePolicyCommandInput,
    PutResourcePolicyCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutResourcePolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    PutResourcePolicyCommandInput,
    PutResourcePolicyCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutResourcePolicyCommand extends PutResourcePolicyCommand_base {
  protected static __types: {
    api: {
      input: PutResourcePolicyInput;
      output: PutResourcePolicyOutput;
    };
    sdk: {
      input: PutResourcePolicyCommandInput;
      output: PutResourcePolicyCommandOutput;
    };
  };
}
