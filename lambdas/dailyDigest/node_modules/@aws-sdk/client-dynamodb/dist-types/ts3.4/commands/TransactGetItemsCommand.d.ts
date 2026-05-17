import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  TransactGetItemsInput,
  TransactGetItemsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface TransactGetItemsCommandInput extends TransactGetItemsInput {}
export interface TransactGetItemsCommandOutput
  extends TransactGetItemsOutput,
    __MetadataBearer {}
declare const TransactGetItemsCommand_base: {
  new (
    input: TransactGetItemsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    TransactGetItemsCommandInput,
    TransactGetItemsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: TransactGetItemsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    TransactGetItemsCommandInput,
    TransactGetItemsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class TransactGetItemsCommand extends TransactGetItemsCommand_base {
  protected static __types: {
    api: {
      input: TransactGetItemsInput;
      output: TransactGetItemsOutput;
    };
    sdk: {
      input: TransactGetItemsCommandInput;
      output: TransactGetItemsCommandOutput;
    };
  };
}
