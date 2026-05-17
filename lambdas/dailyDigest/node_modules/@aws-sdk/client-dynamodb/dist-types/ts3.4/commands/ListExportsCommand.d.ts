import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { ListExportsInput, ListExportsOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ListExportsCommandInput extends ListExportsInput {}
export interface ListExportsCommandOutput
  extends ListExportsOutput,
    __MetadataBearer {}
declare const ListExportsCommand_base: {
  new (
    input: ListExportsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListExportsCommandInput,
    ListExportsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListExportsCommandInput]
  ): import("@smithy/core/client").CommandImpl<
    ListExportsCommandInput,
    ListExportsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListExportsCommand extends ListExportsCommand_base {
  protected static __types: {
    api: {
      input: ListExportsInput;
      output: ListExportsOutput;
    };
    sdk: {
      input: ListExportsCommandInput;
      output: ListExportsCommandOutput;
    };
  };
}
