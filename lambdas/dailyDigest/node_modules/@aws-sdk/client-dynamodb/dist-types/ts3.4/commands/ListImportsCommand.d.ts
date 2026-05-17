import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { ListImportsInput, ListImportsOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ListImportsCommandInput extends ListImportsInput {}
export interface ListImportsCommandOutput
  extends ListImportsOutput,
    __MetadataBearer {}
declare const ListImportsCommand_base: {
  new (
    input: ListImportsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListImportsCommandInput,
    ListImportsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListImportsCommandInput]
  ): import("@smithy/core/client").CommandImpl<
    ListImportsCommandInput,
    ListImportsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListImportsCommand extends ListImportsCommand_base {
  protected static __types: {
    api: {
      input: ListImportsInput;
      output: ListImportsOutput;
    };
    sdk: {
      input: ListImportsCommandInput;
      output: ListImportsCommandOutput;
    };
  };
}
