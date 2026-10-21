import { z } from "@hono/zod-openapi";
import { bigintString, txHashSchema } from "./shared";

export const commitSchema = z
  .object({
    chainLength: bigintString,
    txHash: txHashSchema,
    blockTime: bigintString,
    blockNumber: bigintString,
    sender: txHashSchema,
  })
  .openapi("Commit");
