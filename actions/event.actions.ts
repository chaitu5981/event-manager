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

export const getEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
  });
  return events;
};

export const getEventById = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

export const updateEvent = async (
  eventId: string,
  event: z.infer<typeof createEventSchema>
) => {
  const validatedEvent = createEventSchema.parse(event);
  const existingEvent = await getEventById(eventId);
  if (!existingEvent) {
    throw new Error("Event not found");
  }
  const attendeeCount = await prisma.attendee.count({
    where: { eventId: eventId },
  });
  if (validatedEvent.capacity < attendeeCount) {
    throw new Error(
      "Event capacity cannot be less than the number of attendees"
    );
  }
  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: validatedEvent,
  });
  return updatedEvent;
};

export const deleteEvent = async (eventId: string) => {
  const deletedEvent = await prisma.event.delete({
    where: { id: eventId },
  });
  return deletedEvent;
};
