import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  KinesisStreamingDestinationInput,
  KinesisStreamingDestinationOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DisableKinesisStreamingDestinationCommandInput
  extends KinesisStreamingDestinationInput {}
export interface DisableKinesisStreamingDestinationCommandOutput
  extends KinesisStreamingDestinationOutput,
    __MetadataBearer {}
declare const DisableKinesisStreamingDestinationCommand_base: {
  new (
    input: DisableKinesisStreamingDestinationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DisableKinesisStreamingDestinationCommandInput,
    DisableKinesisStreamingDestinationCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DisableKinesisStreamingDestinationCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DisableKinesisStreamingDestinationCommandInput,
    DisableKinesisStreamingDestinationCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DisableKinesisStreamingDestinationCommand extends DisableKinesisStreamingDestinationCommand_base {
  protected static __types: {
    api: {
      input: KinesisStreamingDestinationInput;
      output: KinesisStreamingDestinationOutput;
    };
    sdk: {
      input: DisableKinesisStreamingDestinationCommandInput;
      output: DisableKinesisStreamingDestinationCommandOutput;
    };
  };
}
