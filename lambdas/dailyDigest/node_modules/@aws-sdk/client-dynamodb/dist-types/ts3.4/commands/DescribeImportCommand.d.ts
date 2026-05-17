import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { DescribeImportInput, DescribeImportOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeImportCommandInput extends DescribeImportInput {}
export interface DescribeImportCommandOutput
  extends DescribeImportOutput,
    __MetadataBearer {}
declare const DescribeImportCommand_base: {
  new (
    input: DescribeImportCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeImportCommandInput,
    DescribeImportCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeImportCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeImportCommandInput,
    DescribeImportCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DescribeImportCommand extends DescribeImportCommand_base {
  protected static __types: {
    api: {
      input: DescribeImportInput;
      output: DescribeImportOutput;
    };
    sdk: {
      input: DescribeImportCommandInput;
      output: DescribeImportCommandOutput;
    };
  };
}
