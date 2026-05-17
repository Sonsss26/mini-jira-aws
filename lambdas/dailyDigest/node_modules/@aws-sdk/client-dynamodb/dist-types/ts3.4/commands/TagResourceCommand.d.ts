import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { TagResourceInput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface TagResourceCommandInput extends TagResourceInput {}
export interface TagResourceCommandOutput extends __MetadataBearer {}
declare const TagResourceCommand_base: {
  new (
    input: TagResourceCommandInput
  ): import("@smithy/core/client").CommandImpl<
    TagResourceCommandInput,
    TagResourceCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: TagResourceCommandInput
  ): import("@smithy/core/client").CommandImpl<
    TagResourceCommandInput,
    TagResourceCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class TagResourceCommand extends TagResourceCommand_base {
  protected static __types: {
    api: {
      input: TagResourceInput;
      output: {};
    };
    sdk: {
      input: TagResourceCommandInput;
      output: TagResourceCommandOutput;
    };
  };
}
