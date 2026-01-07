import { getAttendeesByEventId } from "@/actions/attendee.actions";
import { useQuery } from "@tanstack/react-query";

const useGetAttendees = (eventId: string) => {
  const { data: attendees, isPending } = useQuery({
    queryKey: ["attendees", eventId],
    queryFn: async () => await getAttendeesByEventId(eventId),
    enabled: !!eventId,
  });
  return { attendees, isPending };
};
export default useGetAttendees;
