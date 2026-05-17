import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { BatchWriteItemInput, BatchWriteItemOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface BatchWriteItemCommandInput extends BatchWriteItemInput {}
export interface BatchWriteItemCommandOutput
  extends BatchWriteItemOutput,
    __MetadataBearer {}
declare const BatchWriteItemCommand_base: {
  new (
    input: BatchWriteItemCommandInput
  ): import("@smithy/core/client").CommandImpl<
    BatchWriteItemCommandInput,
    BatchWriteItemCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: BatchWriteItemCommandInput
  ): import("@smithy/core/client").CommandImpl<
    BatchWriteItemCommandInput,
    BatchWriteItemCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class BatchWriteItemCommand extends BatchWriteItemCommand_base {
  protected static __types: {
    api: {
      input: BatchWriteItemInput;
      output: BatchWriteItemOutput;
    };
    sdk: {
      input: BatchWriteItemCommandInput;
      output: BatchWriteItemCommandOutput;
    };
  };
}
