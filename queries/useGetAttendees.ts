import { getAttendeesByEventId } from "@/actions/attendee.actions";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetAttendees = (eventId: string) => {
  const {
    data: attendees,
    isPending,
    error,
  } = useQuery({
    queryKey: ["attendees", eventId],
    queryFn: async () => {
      const response = await getAttendeesByEventId(eventId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.attendees;
    },
    enabled: !!eventId,
  });
  if (error) toast.error(error.message);
  return { attendees, isPending };
};
export default useGetAttendees;
