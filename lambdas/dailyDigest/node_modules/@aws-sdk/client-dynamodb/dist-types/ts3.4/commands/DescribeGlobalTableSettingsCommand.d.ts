import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  DescribeGlobalTableSettingsInput,
  DescribeGlobalTableSettingsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeGlobalTableSettingsCommandInput
  extends DescribeGlobalTableSettingsInput {}
export interface DescribeGlobalTableSettingsCommandOutput
  extends DescribeGlobalTableSettingsOutput,
    __MetadataBearer {}
declare const DescribeGlobalTableSettingsCommand_base: {
  new (
    input: DescribeGlobalTableSettingsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeGlobalTableSettingsCommandInput,
    DescribeGlobalTableSettingsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeGlobalTableSettingsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeGlobalTableSettingsCommandInput,
    DescribeGlobalTableSettingsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DescribeGlobalTableSettingsCommand extends DescribeGlobalTableSettingsCommand_base {
  protected static __types: {
    api: {
      input: DescribeGlobalTableSettingsInput;
      output: DescribeGlobalTableSettingsOutput;
    };
    sdk: {
      input: DescribeGlobalTableSettingsCommandInput;
      output: DescribeGlobalTableSettingsCommandOutput;
    };
  };
}
