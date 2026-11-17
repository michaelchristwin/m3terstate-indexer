import { z } from "zod";

const HexString = z
  .string()
  .regex(/^0x[0-9a-fA-F]*$/, "Must be a 0x-prefixed hex string")
  .transform((s) => s as `0x${string}`);

const envSchema = z.object({
  PONDER_RPC_URL_11155111: z.url(),
  PONDER_RPC_URL_2: z.url(),
  PONDER_RPC_URL_3: z.url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string(),
  ROLLUP_SMART_CONTRACT: HexString,
  DATABASE_KIND: z.enum(["postgres", "pglite"]).default("pglite"),
});

export const env = envSchema.parse(process.env);
