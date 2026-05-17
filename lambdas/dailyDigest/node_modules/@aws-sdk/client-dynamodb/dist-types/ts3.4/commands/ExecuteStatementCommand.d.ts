import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  ExecuteStatementInput,
  ExecuteStatementOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ExecuteStatementCommandInput extends ExecuteStatementInput {}
export interface ExecuteStatementCommandOutput
  extends ExecuteStatementOutput,
    __MetadataBearer {}
declare const ExecuteStatementCommand_base: {
  new (
    input: ExecuteStatementCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ExecuteStatementCommandInput,
    ExecuteStatementCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ExecuteStatementCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ExecuteStatementCommandInput,
    ExecuteStatementCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ExecuteStatementCommand extends ExecuteStatementCommand_base {
  protected static __types: {
    api: {
      input: ExecuteStatementInput;
      output: ExecuteStatementOutput;
    };
    sdk: {
      input: ExecuteStatementCommandInput;
      output: ExecuteStatementCommandOutput;
    };
  };
}
