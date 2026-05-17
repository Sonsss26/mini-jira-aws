import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { ScanInput, ScanOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ScanCommandInput extends ScanInput {}
export interface ScanCommandOutput extends ScanOutput, __MetadataBearer {}
declare const ScanCommand_base: {
  new (input: ScanCommandInput): import("@smithy/core/client").CommandImpl<
    ScanCommandInput,
    ScanCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (input: ScanCommandInput): import("@smithy/core/client").CommandImpl<
    ScanCommandInput,
    ScanCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ScanCommand extends ScanCommand_base {
  protected static __types: {
    api: {
      input: ScanInput;
      output: ScanOutput;
    };
    sdk: {
      input: ScanCommandInput;
      output: ScanCommandOutput;
    };
  };
}
