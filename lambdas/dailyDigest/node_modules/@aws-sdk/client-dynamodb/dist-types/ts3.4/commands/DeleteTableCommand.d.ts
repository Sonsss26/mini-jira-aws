import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { DeleteTableInput, DeleteTableOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteTableCommandInput extends DeleteTableInput {}
export interface DeleteTableCommandOutput
  extends DeleteTableOutput,
    __MetadataBearer {}
declare const DeleteTableCommand_base: {
  new (
    input: DeleteTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteTableCommandInput,
    DeleteTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteTableCommandInput,
    DeleteTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteTableCommand extends DeleteTableCommand_base {
  protected static __types: {
    api: {
      input: DeleteTableInput;
      output: DeleteTableOutput;
    };
    sdk: {
      input: DeleteTableCommandInput;
      output: DeleteTableCommandOutput;
    };
  };
}
