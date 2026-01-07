import { deleteEvent } from "@/actions/event.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteEventAction, isPending } = useMutation({
    mutationFn: async (eventId: string) => {
      const response = await deleteEvent(eventId);
      if (!response.success) {
        throw new Error(response.error);
      } else {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["events"] });
      }
    },
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
