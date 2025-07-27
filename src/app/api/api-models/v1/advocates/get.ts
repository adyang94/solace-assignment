import { z } from "zod";

export const requestSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  }),
  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const advocateSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  degree: z.string(),
  specialties: z.array(z.string()).nullable(),
  yearsOfExperience: z.number(),
  phoneNumber: z.number(),
  createdAt: z.date(),
});

export const responseSchema = z.object({
  data: z.array(advocateSchema),
});

export type RequestInput = z.infer<typeof requestSchema>;
export type ResponseOutput = z.infer<typeof responseSchema>;
