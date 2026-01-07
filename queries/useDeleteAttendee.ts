import { deleteAttendee } from "@/actions/attendee.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteAttendee = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (attendeeId: string) => deleteAttendee(attendeeId),
    onSuccess: () => {
      toast.success("Attendee deleted succesfully");
      queryClient.invalidateQueries({ queryKey: ["attendees"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { deleteAttendeeAction: mutate, isPending };
};

export default useDeleteAttendee;
