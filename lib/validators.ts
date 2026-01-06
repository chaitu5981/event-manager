import z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.date().min(new Date(), "Date must be in the future"),
  capacity: z.number().min(1, "Capacity is required"),
});
