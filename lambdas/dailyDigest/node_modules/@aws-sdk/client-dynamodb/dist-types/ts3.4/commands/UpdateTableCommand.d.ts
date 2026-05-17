import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { UpdateTableInput, UpdateTableOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateTableCommandInput extends UpdateTableInput {}
export interface UpdateTableCommandOutput
  extends UpdateTableOutput,
    __MetadataBearer {}
declare const UpdateTableCommand_base: {
  new (
    input: UpdateTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateTableCommandInput,
    UpdateTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateTableCommandInput,
    UpdateTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateTableCommand extends UpdateTableCommand_base {
  protected static __types: {
    api: {
      input: UpdateTableInput;
      output: UpdateTableOutput;
    };
    sdk: {
      input: UpdateTableCommandInput;
      output: UpdateTableCommandOutput;
    };
  };
}
