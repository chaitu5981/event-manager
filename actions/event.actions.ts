"use server";
import prisma from "@/lib/prisma";
import { createEventSchema } from "@/lib/validators";
import z from "zod";

export const createEvent = async (event: z.infer<typeof createEventSchema>) => {
  const validatedEvent = createEventSchema.parse(event);
  const newEvent = await prisma.event.create({
    data: validatedEvent,
  });
  return newEvent;
};
