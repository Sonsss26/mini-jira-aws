import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  DescribeContributorInsightsInput,
  DescribeContributorInsightsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeContributorInsightsCommandInput
  extends DescribeContributorInsightsInput {}
export interface DescribeContributorInsightsCommandOutput
  extends DescribeContributorInsightsOutput,
    __MetadataBearer {}
declare const DescribeContributorInsightsCommand_base: {
  new (
    input: DescribeContributorInsightsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeContributorInsightsCommandInput,
    DescribeContributorInsightsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeContributorInsightsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeContributorInsightsCommandInput,
    DescribeContributorInsightsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DescribeContributorInsightsCommand extends DescribeContributorInsightsCommand_base {
  protected static __types: {
    api: {
      input: DescribeContributorInsightsInput;
      output: DescribeContributorInsightsOutput;
    };
    sdk: {
      input: DescribeContributorInsightsCommandInput;
      output: DescribeContributorInsightsCommandOutput;
    };
  };
}
