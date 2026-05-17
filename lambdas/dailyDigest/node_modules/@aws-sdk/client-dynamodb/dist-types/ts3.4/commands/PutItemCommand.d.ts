import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { PutItemInput, PutItemOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface PutItemCommandInput extends PutItemInput {}
export interface PutItemCommandOutput extends PutItemOutput, __MetadataBearer {}
declare const PutItemCommand_base: {
  new (input: PutItemCommandInput): import("@smithy/core/client").CommandImpl<
    PutItemCommandInput,
    PutItemCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (input: PutItemCommandInput): import("@smithy/core/client").CommandImpl<
    PutItemCommandInput,
    PutItemCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class PutItemCommand extends PutItemCommand_base {
  protected static __types: {
    api: {
      input: PutItemInput;
      output: PutItemOutput;
    };
    sdk: {
      input: PutItemCommandInput;
      output: PutItemCommandOutput;
    };
  };
}
