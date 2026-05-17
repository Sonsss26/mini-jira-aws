import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  UpdateTimeToLiveInput,
  UpdateTimeToLiveOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateTimeToLiveCommandInput extends UpdateTimeToLiveInput {}
export interface UpdateTimeToLiveCommandOutput
  extends UpdateTimeToLiveOutput,
    __MetadataBearer {}
declare const UpdateTimeToLiveCommand_base: {
  new (
    input: UpdateTimeToLiveCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateTimeToLiveCommandInput,
    UpdateTimeToLiveCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateTimeToLiveCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateTimeToLiveCommandInput,
    UpdateTimeToLiveCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateTimeToLiveCommand extends UpdateTimeToLiveCommand_base {
  protected static __types: {
    api: {
      input: UpdateTimeToLiveInput;
      output: UpdateTimeToLiveOutput;
    };
    sdk: {
      input: UpdateTimeToLiveCommandInput;
      output: UpdateTimeToLiveCommandOutput;
    };
  };
}
