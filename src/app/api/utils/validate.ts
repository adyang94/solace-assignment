import { z } from "zod";

export function validateSchema<T>(
  data: unknown,
  schema?: z.ZodSchema<T>
): { success: true; data: T } | { success: false; issues: unknown } {
  if (!schema) return { success: true, data: data as T };

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, issues: parsed.error.message };
  }

  return { success: true, data: parsed.data };
}
