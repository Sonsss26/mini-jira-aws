import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  UpdateContributorInsightsInput,
  UpdateContributorInsightsOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateContributorInsightsCommandInput
  extends UpdateContributorInsightsInput {}
export interface UpdateContributorInsightsCommandOutput
  extends UpdateContributorInsightsOutput,
    __MetadataBearer {}
declare const UpdateContributorInsightsCommand_base: {
  new (
    input: UpdateContributorInsightsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateContributorInsightsCommandInput,
    UpdateContributorInsightsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateContributorInsightsCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateContributorInsightsCommandInput,
    UpdateContributorInsightsCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateContributorInsightsCommand extends UpdateContributorInsightsCommand_base {
  protected static __types: {
    api: {
      input: UpdateContributorInsightsInput;
      output: UpdateContributorInsightsOutput;
    };
    sdk: {
      input: UpdateContributorInsightsCommandInput;
      output: UpdateContributorInsightsCommandOutput;
    };
  };
}
