import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { DescribeBackupInput, DescribeBackupOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeBackupCommandInput extends DescribeBackupInput {}
export interface DescribeBackupCommandOutput
  extends DescribeBackupOutput,
    __MetadataBearer {}
declare const DescribeBackupCommand_base: {
  new (
    input: DescribeBackupCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeBackupCommandInput,
    DescribeBackupCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeBackupCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeBackupCommandInput,
    DescribeBackupCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DescribeBackupCommand extends DescribeBackupCommand_base {
  protected static __types: {
    api: {
      input: DescribeBackupInput;
      output: DescribeBackupOutput;
    };
    sdk: {
      input: DescribeBackupCommandInput;
      output: DescribeBackupCommandOutput;
    };
  };
}
