"use server";
import prisma from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { createEventSchema } from "@/lib/validators";
import z from "zod";

export const createEvent = async (event: z.infer<typeof createEventSchema>) => {
  try {
    const validatedEvent = createEventSchema.parse(event);
    const newEvent = await prisma.event.create({
      data: validatedEvent,
    });
    return { success: true, message: "Event created successfully" };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const getEvents = async () => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });
    return { success: true, events };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    return { success: true, event };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const updateEvent = async (
  eventId: string,
  event: z.infer<typeof createEventSchema>
) => {
  try {
    const validatedEvent = createEventSchema.parse(event);
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });
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
    await prisma.event.update({
      where: { id: eventId },
      data: validatedEvent,
    });
    return { success: true, message: "Event updated successfully" };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!existingEvent) {
      throw new Error("Event not found");
    }
    await prisma.event.delete({
      where: { id: eventId },
    });
    return { success: true, message: "Event deleted successfully" };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
