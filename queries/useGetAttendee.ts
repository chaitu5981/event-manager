import { getAttendeeById } from "@/actions/attendee.actions";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetAttendee = (attendeeId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["attendee", attendeeId],
    queryFn: () => getAttendeeById(attendeeId),
    enabled: !!attendeeId,
  });
  return { attendee: data, isPending };
};
export default useGetAttendee;
