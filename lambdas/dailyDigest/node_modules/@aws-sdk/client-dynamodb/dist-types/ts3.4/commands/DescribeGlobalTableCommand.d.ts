import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  DescribeGlobalTableInput,
  DescribeGlobalTableOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeGlobalTableCommandInput
  extends DescribeGlobalTableInput {}
export interface DescribeGlobalTableCommandOutput
  extends DescribeGlobalTableOutput,
    __MetadataBearer {}
declare const DescribeGlobalTableCommand_base: {
  new (
    input: DescribeGlobalTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeGlobalTableCommandInput,
    DescribeGlobalTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeGlobalTableCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeGlobalTableCommandInput,
    DescribeGlobalTableCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DescribeGlobalTableCommand extends DescribeGlobalTableCommand_base {
  protected static __types: {
    api: {
      input: DescribeGlobalTableInput;
      output: DescribeGlobalTableOutput;
    };
    sdk: {
      input: DescribeGlobalTableCommandInput;
      output: DescribeGlobalTableCommandOutput;
    };
  };
}
