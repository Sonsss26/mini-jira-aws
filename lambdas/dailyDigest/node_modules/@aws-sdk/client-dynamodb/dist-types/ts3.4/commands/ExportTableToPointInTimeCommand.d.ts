import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  ExportTableToPointInTimeInput,
  ExportTableToPointInTimeOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ExportTableToPointInTimeCommandInput
  extends ExportTableToPointInTimeInput {}
export interface ExportTableToPointInTimeCommandOutput
  extends ExportTableToPointInTimeOutput,
    __MetadataBearer {}
declare const ExportTableToPointInTimeCommand_base: {
  new (
    input: ExportTableToPointInTimeCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ExportTableToPointInTimeCommandInput,
    ExportTableToPointInTimeCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ExportTableToPointInTimeCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ExportTableToPointInTimeCommandInput,
    ExportTableToPointInTimeCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ExportTableToPointInTimeCommand extends ExportTableToPointInTimeCommand_base {
  protected static __types: {
    api: {
      input: ExportTableToPointInTimeInput;
      output: ExportTableToPointInTimeOutput;
    };
    sdk: {
      input: ExportTableToPointInTimeCommandInput;
      output: ExportTableToPointInTimeCommandOutput;
    };
  };
}
