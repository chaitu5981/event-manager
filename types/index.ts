import z from "zod";
import { createEventValidator } from "@/lib/validators";
export type Event = z.infer<typeof createEventValidator> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
