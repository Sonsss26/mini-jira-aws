import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { BatchGetItemInput, BatchGetItemOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface BatchGetItemCommandInput extends BatchGetItemInput {}
export interface BatchGetItemCommandOutput
  extends BatchGetItemOutput,
    __MetadataBearer {}
declare const BatchGetItemCommand_base: {
  new (
    input: BatchGetItemCommandInput
  ): import("@smithy/core/client").CommandImpl<
    BatchGetItemCommandInput,
    BatchGetItemCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: BatchGetItemCommandInput
  ): import("@smithy/core/client").CommandImpl<
    BatchGetItemCommandInput,
    BatchGetItemCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class BatchGetItemCommand extends BatchGetItemCommand_base {
  protected static __types: {
    api: {
      input: BatchGetItemInput;
      output: BatchGetItemOutput;
    };
    sdk: {
      input: BatchGetItemCommandInput;
      output: BatchGetItemCommandOutput;
    };
  };
}
