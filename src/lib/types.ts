import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  ingredients: z.object({ value: z.string() }).array().min(1),
  instructions: z.object({ value: z.string() }).array().min(1),
  cookTime: z.string().min(1).max(100),
  imageURL: z.string().optional(),
});

export type TRecipe = z.infer<typeof recipeSchema>;
