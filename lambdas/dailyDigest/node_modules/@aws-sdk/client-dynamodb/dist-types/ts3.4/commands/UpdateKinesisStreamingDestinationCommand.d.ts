import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  UpdateKinesisStreamingDestinationInput,
  UpdateKinesisStreamingDestinationOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateKinesisStreamingDestinationCommandInput
  extends UpdateKinesisStreamingDestinationInput {}
export interface UpdateKinesisStreamingDestinationCommandOutput
  extends UpdateKinesisStreamingDestinationOutput,
    __MetadataBearer {}
declare const UpdateKinesisStreamingDestinationCommand_base: {
  new (
    input: UpdateKinesisStreamingDestinationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateKinesisStreamingDestinationCommandInput,
    UpdateKinesisStreamingDestinationCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateKinesisStreamingDestinationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateKinesisStreamingDestinationCommandInput,
    UpdateKinesisStreamingDestinationCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateKinesisStreamingDestinationCommand extends UpdateKinesisStreamingDestinationCommand_base {
  protected static __types: {
    api: {
      input: UpdateKinesisStreamingDestinationInput;
      output: UpdateKinesisStreamingDestinationOutput;
    };
    sdk: {
      input: UpdateKinesisStreamingDestinationCommandInput;
      output: UpdateKinesisStreamingDestinationCommandOutput;
    };
  };
}
