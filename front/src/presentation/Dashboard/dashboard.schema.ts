import { z } from 'zod';

export const dashboardSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});