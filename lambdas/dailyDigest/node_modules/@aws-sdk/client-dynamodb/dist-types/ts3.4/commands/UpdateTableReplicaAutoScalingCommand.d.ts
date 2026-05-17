import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  UpdateTableReplicaAutoScalingInput,
  UpdateTableReplicaAutoScalingOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateTableReplicaAutoScalingCommandInput
  extends UpdateTableReplicaAutoScalingInput {}
export interface UpdateTableReplicaAutoScalingCommandOutput
  extends UpdateTableReplicaAutoScalingOutput,
    __MetadataBearer {}
declare const UpdateTableReplicaAutoScalingCommand_base: {
  new (
    input: UpdateTableReplicaAutoScalingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateTableReplicaAutoScalingCommandInput,
    UpdateTableReplicaAutoScalingCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateTableReplicaAutoScalingCommandInput
  ): import("@smithy/core/client").CommandImpl<
    UpdateTableReplicaAutoScalingCommandInput,
    UpdateTableReplicaAutoScalingCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class UpdateTableReplicaAutoScalingCommand extends UpdateTableReplicaAutoScalingCommand_base {
  protected static __types: {
    api: {
      input: UpdateTableReplicaAutoScalingInput;
      output: UpdateTableReplicaAutoScalingOutput;
    };
    sdk: {
      input: UpdateTableReplicaAutoScalingCommandInput;
      output: UpdateTableReplicaAutoScalingCommandOutput;
    };
  };
}
