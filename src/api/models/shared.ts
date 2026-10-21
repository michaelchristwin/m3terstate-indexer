import { z } from "@hono/zod-openapi";

export const bigintString = z.string().regex(/^\d+$/).openapi({
  type: "string",
  example: "1000000000000000000",
  description: "uint256 as decimal string",
});

export const txHashSchema = z
  .string()
  .regex(/^0x[0-9a-fA-F]{64}$/)
  .openapi({ example: "0x" + "ab".repeat(32) });
