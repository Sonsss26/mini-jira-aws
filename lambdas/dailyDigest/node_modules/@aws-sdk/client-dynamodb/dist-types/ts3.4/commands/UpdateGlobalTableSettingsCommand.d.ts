import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  UpdateGlobalTableSettingsInput,
  UpdateGlobalTableSettingsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateGlobalTableSettingsCommandInput
  extends UpdateGlobalTableSettingsInput {}
export interface UpdateGlobalTableSettingsCommandOutput
  extends UpdateGlobalTableSettingsOutput,
    __MetadataBearer {}
declare const UpdateGlobalTableSettingsCommand_base: {
  new (
    input: UpdateGlobalTableSettingsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateGlobalTableSettingsCommandInput,
    UpdateGlobalTableSettingsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateGlobalTableSettingsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateGlobalTableSettingsCommandInput,
    UpdateGlobalTableSettingsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateGlobalTableSettingsCommand extends UpdateGlobalTableSettingsCommand_base {
  protected static __types: {
    api: {
      input: UpdateGlobalTableSettingsInput;
      output: UpdateGlobalTableSettingsOutput;
    };
    sdk: {
      input: UpdateGlobalTableSettingsCommandInput;
      output: UpdateGlobalTableSettingsCommandOutput;
    };
  };
}
