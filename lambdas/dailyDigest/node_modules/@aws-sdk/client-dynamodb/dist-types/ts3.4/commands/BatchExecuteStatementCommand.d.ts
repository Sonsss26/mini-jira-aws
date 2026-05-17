import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  BatchExecuteStatementInput,
  BatchExecuteStatementOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface BatchExecuteStatementCommandInput
  extends BatchExecuteStatementInput {}
export interface BatchExecuteStatementCommandOutput
  extends BatchExecuteStatementOutput,
    __MetadataBearer {}
declare const BatchExecuteStatementCommand_base: {
  new (
    input: BatchExecuteStatementCommandInput
  ): import("@smithy/core/client").CommandImpl<
    BatchExecuteStatementCommandInput,
    BatchExecuteStatementCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: BatchExecuteStatementCommandInput
  ): import("@smithy/core/client").CommandImpl<
    BatchExecuteStatementCommandInput,
    BatchExecuteStatementCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class BatchExecuteStatementCommand extends BatchExecuteStatementCommand_base {
  protected static __types: {
    api: {
      input: BatchExecuteStatementInput;
      output: BatchExecuteStatementOutput;
    };
    sdk: {
      input: BatchExecuteStatementCommandInput;
      output: BatchExecuteStatementCommandOutput;
    };
  };
}
