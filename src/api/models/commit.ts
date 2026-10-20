import { z } from "@hono/zod-openapi";

export const commitSchema = z.object({
  chainLength: z.bigint(),
  txHash: z.hex(),
  blockTime: z.bigint(),
  blockNumber: z.bigint(),
  sender: z.hex(),
});
