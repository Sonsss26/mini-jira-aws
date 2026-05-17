import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  CreateGlobalTableInput,
  CreateGlobalTableOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateGlobalTableCommandInput extends CreateGlobalTableInput {}
export interface CreateGlobalTableCommandOutput
  extends CreateGlobalTableOutput,
    __MetadataBearer {}
declare const CreateGlobalTableCommand_base: {
  new (
    input: CreateGlobalTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateGlobalTableCommandInput,
    CreateGlobalTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateGlobalTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    CreateGlobalTableCommandInput,
    CreateGlobalTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class CreateGlobalTableCommand extends CreateGlobalTableCommand_base {
  protected static __types: {
    api: {
      input: CreateGlobalTableInput;
      output: CreateGlobalTableOutput;
    };
    sdk: {
      input: CreateGlobalTableCommandInput;
      output: CreateGlobalTableCommandOutput;
    };
  };
}
