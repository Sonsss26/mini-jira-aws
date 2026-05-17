import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  UpdateGlobalTableInput,
  UpdateGlobalTableOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateGlobalTableCommandInput extends UpdateGlobalTableInput {}
export interface UpdateGlobalTableCommandOutput
  extends UpdateGlobalTableOutput,
    __MetadataBearer {}
declare const UpdateGlobalTableCommand_base: {
  new (
    input: UpdateGlobalTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateGlobalTableCommandInput,
    UpdateGlobalTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateGlobalTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateGlobalTableCommandInput,
    UpdateGlobalTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateGlobalTableCommand extends UpdateGlobalTableCommand_base {
  protected static __types: {
    api: {
      input: UpdateGlobalTableInput;
      output: UpdateGlobalTableOutput;
    };
    sdk: {
      input: UpdateGlobalTableCommandInput;
      output: UpdateGlobalTableCommandOutput;
    };
  };
}
