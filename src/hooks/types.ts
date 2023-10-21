import z from "zod";

export const jobItem = z.object({
  id: z.number(),
  position: z.string(),
  industry: z.string(),
  team: z.string(),
  location: z.string(),
  job_type: z.string(),
  date_posted: z.string().datetime({ offset: true }),
});

export const jobs = z
  .object({
    results: z.array(jobItem),
  })

export type JobItem = z.infer<typeof jobItem>;
export type Jobs = z.infer<typeof jobs>;
