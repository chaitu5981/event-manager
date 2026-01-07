"use server";
import prisma from "@/lib/prisma";
import { addAttendeeSchema } from "@/lib/validators";
import z from "zod";

export const addAttendee = async (data: z.infer<typeof addAttendeeSchema>) => {
  const validatedData = addAttendeeSchema.parse(data);
  const event = await prisma.event.findUnique({
    where: {
      id: validatedData.eventId,
    },
  });
  if (!event) {
    throw new Error("Event not found");
  }
  const existingAttendee = await prisma.attendee.findFirst({
    where: {
      eventId: validatedData.eventId,
      email: validatedData.email,
    },
  });
  if (existingAttendee) {
    throw new Error("Attendee already registered for this event");
  }
  if (
    event.capacity <=
    (await prisma.attendee.count({
      where: {
        eventId: validatedData.eventId,
      },
    }))
  ) {
    throw new Error("Event is already at full capacity");
  }

  return await prisma.attendee.create({
    data: validatedData,
  });
};

export const getAttendeesByEventId = async (eventId: string) => {
  return await prisma.attendee.findMany({
    where: {
      eventId: eventId,
    },
  });
};

export const getAttendeeById = async (attendeeId: string) => {
  const existingAttendee = await prisma.attendee.findFirst({
    where: {
      id: attendeeId,
    },
  });
  if (!existingAttendee) {
    throw new Error("Attendee not found");
  }
  return existingAttendee;
};

export const updateAttendee = async (
  attendeeId: string,
  data: z.infer<typeof addAttendeeSchema>
) => {
  const validatedData = addAttendeeSchema.parse(data);
  return await prisma.attendee.update({
    where: { id: attendeeId },
    data: validatedData,
  });
};

export const deleteAttendee = async (attendeeId: string) => {
  const existingAttendee = await getAttendeeById(attendeeId);
  if (!existingAttendee) {
    throw new Error("Attendee not found");
  }
  return await prisma.attendee.delete({
    where: { id: attendeeId },
  });
};
