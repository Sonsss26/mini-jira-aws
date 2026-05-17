import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { CreateTableInput, CreateTableOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateTableCommandInput extends CreateTableInput {}
export interface CreateTableCommandOutput
  extends CreateTableOutput,
    __MetadataBearer {}
declare const CreateTableCommand_base: {
  new (
    input: CreateTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateTableCommandInput,
    CreateTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateTableCommandInput,
    CreateTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class CreateTableCommand extends CreateTableCommand_base {
  protected static __types: {
    api: {
      input: CreateTableInput;
      output: CreateTableOutput;
    };
    sdk: {
      input: CreateTableCommandInput;
      output: CreateTableCommandOutput;
    };
  };
}
