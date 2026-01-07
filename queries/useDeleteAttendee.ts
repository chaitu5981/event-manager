import { deleteAttendee } from "@/actions/attendee.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteAttendee = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (attendeeId: string) => {
      const response = await deleteAttendee(attendeeId);
      if (!response.success) {
        throw new Error(response.error);
      } else {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["attendees"] });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { deleteAttendeeAction: mutate, isPending };
};

export default useDeleteAttendee;
