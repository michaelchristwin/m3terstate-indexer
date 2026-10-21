import { z } from "@hono/zod-openapi";
import { bigintString, txHashSchema } from "./shared";

export const m3terstateSchema = z
  .object({
    chainLength: bigintString,
    txHash: txHashSchema,
    meterNo: z.int().nonnegative(),
    account: bigintString,
    nonce: bigintString,
  })
  .openapi("M3terstate");

export const m3terstateListSchema = z.array(m3terstateSchema);
