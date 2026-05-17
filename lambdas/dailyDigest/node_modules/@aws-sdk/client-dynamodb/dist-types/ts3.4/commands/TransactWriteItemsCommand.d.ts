import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  TransactWriteItemsInput,
  TransactWriteItemsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface TransactWriteItemsCommandInput
  extends TransactWriteItemsInput {}
export interface TransactWriteItemsCommandOutput
  extends TransactWriteItemsOutput,
    __MetadataBearer {}
declare const TransactWriteItemsCommand_base: {
  new (
    input: TransactWriteItemsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    TransactWriteItemsCommandInput,
    TransactWriteItemsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: TransactWriteItemsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    TransactWriteItemsCommandInput,
    TransactWriteItemsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class TransactWriteItemsCommand extends TransactWriteItemsCommand_base {
  protected static __types: {
    api: {
      input: TransactWriteItemsInput;
      output: TransactWriteItemsOutput;
    };
    sdk: {
      input: TransactWriteItemsCommandInput;
      output: TransactWriteItemsCommandOutput;
    };
  };
}
