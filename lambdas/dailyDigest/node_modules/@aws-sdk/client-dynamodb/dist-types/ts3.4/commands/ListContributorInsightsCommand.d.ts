import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  ListContributorInsightsInput,
  ListContributorInsightsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ListContributorInsightsCommandInput
  extends ListContributorInsightsInput {}
export interface ListContributorInsightsCommandOutput
  extends ListContributorInsightsOutput,
    __MetadataBearer {}
declare const ListContributorInsightsCommand_base: {
  new (
    input: ListContributorInsightsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    ListContributorInsightsCommandInput,
    ListContributorInsightsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListContributorInsightsCommandInput]
  ): import("@smithy/core/client").CommandImpl<
    ListContributorInsightsCommandInput,
    ListContributorInsightsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class ListContributorInsightsCommand extends ListContributorInsightsCommand_base {
  protected static __types: {
    api: {
      input: ListContributorInsightsInput;
      output: ListContributorInsightsOutput;
    };
    sdk: {
      input: ListContributorInsightsCommandInput;
      output: ListContributorInsightsCommandOutput;
    };
  };
}
