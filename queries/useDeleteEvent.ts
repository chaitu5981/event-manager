import { deleteEvent } from "@/actions/event.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteEventAction, isPending } = useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });
  return { deleteEventAction, isPending };
};
export default useDeleteEvent;
