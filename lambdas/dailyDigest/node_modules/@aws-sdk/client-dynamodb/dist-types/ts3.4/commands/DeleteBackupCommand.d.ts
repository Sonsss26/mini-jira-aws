import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import { DeleteBackupInput, DeleteBackupOutput } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteBackupCommandInput extends DeleteBackupInput {}
export interface DeleteBackupCommandOutput
  extends DeleteBackupOutput,
    __MetadataBearer {}
declare const DeleteBackupCommand_base: {
  new (
    input: DeleteBackupCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBackupCommandInput,
    DeleteBackupCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteBackupCommandInput
  ): import("@smithy/core/client").CommandImpl<
    DeleteBackupCommandInput,
    DeleteBackupCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class DeleteBackupCommand extends DeleteBackupCommand_base {
  protected static __types: {
    api: {
      input: DeleteBackupInput;
      output: DeleteBackupOutput;
    };
    sdk: {
      input: DeleteBackupCommandInput;
      output: DeleteBackupCommandOutput;
    };
  };
}
