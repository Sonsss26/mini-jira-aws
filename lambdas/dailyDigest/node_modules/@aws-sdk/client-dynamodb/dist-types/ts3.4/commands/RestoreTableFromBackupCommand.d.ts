import { Command as $Command } from "@smithy/core/client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DynamoDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../DynamoDBClient";
import {
  RestoreTableFromBackupInput,
  RestoreTableFromBackupOutput,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface RestoreTableFromBackupCommandInput
  extends RestoreTableFromBackupInput {}
export interface RestoreTableFromBackupCommandOutput
  extends RestoreTableFromBackupOutput,
    __MetadataBearer {}
declare const RestoreTableFromBackupCommand_base: {
  new (
    input: RestoreTableFromBackupCommandInput
  ): import("@smithy/core/client").CommandImpl<
    RestoreTableFromBackupCommandInput,
    RestoreTableFromBackupCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: RestoreTableFromBackupCommandInput
  ): import("@smithy/core/client").CommandImpl<
    RestoreTableFromBackupCommandInput,
    RestoreTableFromBackupCommandOutput,
    DynamoDBClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): {
    [x: string]: unknown;
  };
};
export declare class RestoreTableFromBackupCommand extends RestoreTableFromBackupCommand_base {
  protected static __types: {
    api: {
      input: RestoreTableFromBackupInput;
      output: RestoreTableFromBackupOutput;
    };
    sdk: {
      input: RestoreTableFromBackupCommandInput;
      output: RestoreTableFromBackupCommandOutput;
    };
  };
}
