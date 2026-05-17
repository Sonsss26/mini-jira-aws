import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  ListTagsOfResourceInput,
  ListTagsOfResourceOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ListTagsOfResourceCommandInput
  extends ListTagsOfResourceInput {}
export interface ListTagsOfResourceCommandOutput
  extends ListTagsOfResourceOutput,
    __MetadataBearer {}
declare const ListTagsOfResourceCommand_base: {
  new (
    input: ListTagsOfResourceCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListTagsOfResourceCommandInput,
    ListTagsOfResourceCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListTagsOfResourceCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListTagsOfResourceCommandInput,
    ListTagsOfResourceCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListTagsOfResourceCommand extends ListTagsOfResourceCommand_base {
  protected static __types: {
    api: {
      input: ListTagsOfResourceInput;
      output: ListTagsOfResourceOutput;
    };
    sdk: {
      input: ListTagsOfResourceCommandInput;
      output: ListTagsOfResourceCommandOutput;
    };
  };
}
