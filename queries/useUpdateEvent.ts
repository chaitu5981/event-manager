import { updateEvent } from "@/actions/event.actions";
import { createEventSchema } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { useRouter } from "next/navigation";

const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: updateEventAction, isPending } = useMutation({
    mutationFn: ({
      eventId,
      event,
    }: {
      eventId: string;
      event: z.infer<typeof createEventSchema>;
    }) => updateEvent(eventId, event),
    onSuccess: () => {
      toast.success("Event updated successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateEventAction, isPending };
};
export default useUpdateEvent;
