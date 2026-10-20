import { z } from "@hono/zod-openapi";

export const commitSchema = z.object({
  chainLength: z.bigint(),
  txHash: z.hex(),
  meterNo: z.int().positive(),
  account: z.bigint(),
  nonce: z.bigint(),
});
