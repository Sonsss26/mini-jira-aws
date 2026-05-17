import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  DeleteResourcePolicyInput,
  DeleteResourcePolicyOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteResourcePolicyCommandInput
  extends DeleteResourcePolicyInput {}
export interface DeleteResourcePolicyCommandOutput
  extends DeleteResourcePolicyOutput,
    __MetadataBearer {}
declare const DeleteResourcePolicyCommand_base: {
  new (
    input: DeleteResourcePolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteResourcePolicyCommandInput,
    DeleteResourcePolicyCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteResourcePolicyCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteResourcePolicyCommandInput,
    DeleteResourcePolicyCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteResourcePolicyCommand extends DeleteResourcePolicyCommand_base {
  protected static __types: {
    api: {
      input: DeleteResourcePolicyInput;
      output: DeleteResourcePolicyOutput;
    };
    sdk: {
      input: DeleteResourcePolicyCommandInput;
      output: DeleteResourcePolicyCommandOutput;
    };
  };
}
