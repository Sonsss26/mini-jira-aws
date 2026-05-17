import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface GetResourcePolicyCommandInput extends GetResourcePolicyInput {}
export interface GetResourcePolicyCommandOutput
  extends GetResourcePolicyOutput,
    __MetadataBearer {}
declare const GetResourcePolicyCommand_base: {
  new (
    input: GetResourcePolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetResourcePolicyCommandInput,
    GetResourcePolicyCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetResourcePolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    GetResourcePolicyCommandInput,
    GetResourcePolicyCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class GetResourcePolicyCommand extends GetResourcePolicyCommand_base {
  protected static __types: {
    api: {
      input: GetResourcePolicyInput;
      output: GetResourcePolicyOutput;
    };
    sdk: {
      input: GetResourcePolicyCommandInput;
      output: GetResourcePolicyCommandOutput;
    };
  };
}
