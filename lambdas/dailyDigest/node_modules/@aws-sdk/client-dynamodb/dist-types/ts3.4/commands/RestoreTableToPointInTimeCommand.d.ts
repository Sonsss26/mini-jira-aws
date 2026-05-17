import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  RestoreTableToPointInTimeInput,
  RestoreTableToPointInTimeOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface RestoreTableToPointInTimeCommandInput
  extends RestoreTableToPointInTimeInput {}
export interface RestoreTableToPointInTimeCommandOutput
  extends RestoreTableToPointInTimeOutput,
    __MetadataBearer {}
declare const RestoreTableToPointInTimeCommand_base: {
  new (
    input: RestoreTableToPointInTimeCommandInput
  ): import("@smithy/core/client").CommandImpl<
    RestoreTableToPointInTimeCommandInput,
    RestoreTableToPointInTimeCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: RestoreTableToPointInTimeCommandInput
  ): import("@smithy/core/client").CommandImpl<
    RestoreTableToPointInTimeCommandInput,
    RestoreTableToPointInTimeCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class RestoreTableToPointInTimeCommand extends RestoreTableToPointInTimeCommand_base {
  protected static __types: {
    api: {
      input: RestoreTableToPointInTimeInput;
      output: RestoreTableToPointInTimeOutput;
    };
    sdk: {
      input: RestoreTableToPointInTimeCommandInput;
      output: RestoreTableToPointInTimeCommandOutput;
    };
  };
}
