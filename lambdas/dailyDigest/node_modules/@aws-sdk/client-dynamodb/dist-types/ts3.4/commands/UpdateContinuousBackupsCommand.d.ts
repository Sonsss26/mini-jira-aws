import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  UpdateContinuousBackupsInput,
  UpdateContinuousBackupsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateContinuousBackupsCommandInput
  extends UpdateContinuousBackupsInput {}
export interface UpdateContinuousBackupsCommandOutput
  extends UpdateContinuousBackupsOutput,
    __MetadataBearer {}
declare const UpdateContinuousBackupsCommand_base: {
  new (
    input: UpdateContinuousBackupsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateContinuousBackupsCommandInput,
    UpdateContinuousBackupsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateContinuousBackupsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateContinuousBackupsCommandInput,
    UpdateContinuousBackupsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateContinuousBackupsCommand extends UpdateContinuousBackupsCommand_base {
  protected static __types: {
    api: {
      input: UpdateContinuousBackupsInput;
      output: UpdateContinuousBackupsOutput;
    };
    sdk: {
      input: UpdateContinuousBackupsCommandInput;
      output: UpdateContinuousBackupsCommandOutput;
    };
  };
}
