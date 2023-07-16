import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
