import { z } from "zod";

const envSchema = z.object({
  PONDER_RPC_URL_11155111: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
