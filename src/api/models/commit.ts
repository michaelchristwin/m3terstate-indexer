import { z } from "@hono/zod-openapi";

const bigintString = z.string().regex(/^\d+$/).openapi({
  type: "string",
  example: "1000000000000000000",
  description: "uint256 as decimal string",
});

export const commitSchema = z
  .object({
    chainLength: bigintString,
    txHash: z.hex(),
    blockTime: bigintString,
    blockNumber: bigintString,
    sender: z.hex(),
  })
  .openapi("Commit");
