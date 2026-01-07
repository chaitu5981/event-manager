import z from "zod";
import { addAttendeeSchema, createEventSchema } from "@/lib/validators";
export type Event = z.infer<typeof createEventSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Attendee = z.infer<typeof addAttendeeSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
