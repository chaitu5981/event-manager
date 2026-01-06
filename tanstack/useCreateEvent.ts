import { createEvent } from "@/actions/event.actions";
import { createEventSchema } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: (event: z.infer<typeof createEventSchema>) =>
      createEvent(event),
  });
};
