import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  ExecuteTransactionInput,
  ExecuteTransactionOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ExecuteTransactionCommandInput
  extends ExecuteTransactionInput {}
export interface ExecuteTransactionCommandOutput
  extends ExecuteTransactionOutput,
    __MetadataBearer {}
declare const ExecuteTransactionCommand_base: {
  new (
    input: ExecuteTransactionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ExecuteTransactionCommandInput,
    ExecuteTransactionCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ExecuteTransactionCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ExecuteTransactionCommandInput,
    ExecuteTransactionCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ExecuteTransactionCommand extends ExecuteTransactionCommand_base {
  protected static __types: {
    api: {
      input: ExecuteTransactionInput;
      output: ExecuteTransactionOutput;
    };
    sdk: {
      input: ExecuteTransactionCommandInput;
      output: ExecuteTransactionCommandOutput;
    };
  };
}
