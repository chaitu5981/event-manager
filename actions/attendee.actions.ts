"use server";
import prisma from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { addAttendeeSchema } from "@/lib/validators";
import z from "zod";

export const addAttendee = async (data: z.infer<typeof addAttendeeSchema>) => {
  try {
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

    await prisma.attendee.create({
      data: validatedData,
    });
    return { success: true, message: "Attendee added successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add attendee",
    };
  }
};

export const getAttendeesByEventId = async (eventId: string) => {
  try {
    const attendees = await prisma.attendee.findMany({
      where: {
        eventId: eventId,
      },
    });
    return { success: true, attendees };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const getAttendeeById = async (attendeeId: string) => {
  try {
    const existingAttendee = await prisma.attendee.findFirst({
      where: {
        id: attendeeId,
      },
    });
    if (!existingAttendee) {
      throw new Error("Attendee not found");
    }
    return { success: true, attendee: existingAttendee };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const updateAttendee = async (
  attendeeId: string,
  data: z.infer<typeof addAttendeeSchema>
) => {
  try {
    const validatedData = addAttendeeSchema.parse(data);
    const existingAttendee = await prisma.attendee.findFirst({
      where: {
        id: attendeeId,
      },
    });
    if (!existingAttendee) {
      throw new Error("Attendee not found");
    }
    await prisma.attendee.update({
      where: { id: attendeeId },
      data: validatedData,
    });
    return { success: true, message: "Attendee updated successfully" };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const deleteAttendee = async (attendeeId: string) => {
  try {
    const existingAttendee = await prisma.attendee.findFirst({
      where: {
        id: attendeeId,
      },
    });
    if (!existingAttendee) {
      throw new Error("Attendee not found");
    }
    await prisma.attendee.delete({
      where: { id: attendeeId },
    });
    return { success: true, message: "Attendee deleted successfully" };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
