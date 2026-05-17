import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  DescribeTableReplicaAutoScalingInput,
  DescribeTableReplicaAutoScalingOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeTableReplicaAutoScalingCommandInput
  extends DescribeTableReplicaAutoScalingInput {}
export interface DescribeTableReplicaAutoScalingCommandOutput
  extends DescribeTableReplicaAutoScalingOutput,
    __MetadataBearer {}
declare const DescribeTableReplicaAutoScalingCommand_base: {
  new (
    input: DescribeTableReplicaAutoScalingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeTableReplicaAutoScalingCommandInput,
    DescribeTableReplicaAutoScalingCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeTableReplicaAutoScalingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DescribeTableReplicaAutoScalingCommandInput,
    DescribeTableReplicaAutoScalingCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DescribeTableReplicaAutoScalingCommand extends DescribeTableReplicaAutoScalingCommand_base {
  protected static __types: {
    api: {
      input: DescribeTableReplicaAutoScalingInput;
      output: DescribeTableReplicaAutoScalingOutput;
    };
    sdk: {
      input: DescribeTableReplicaAutoScalingCommandInput;
      output: DescribeTableReplicaAutoScalingCommandOutput;
    };
  };
}
