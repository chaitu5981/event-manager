import { getAttendeeById } from "@/actions/attendee.actions";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetAttendee = (attendeeId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["attendee", attendeeId],
    queryFn: async () => {
      const response = await getAttendeeById(attendeeId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.attendee;
    },
    enabled: !!attendeeId,
  });
  if (error) toast.error(error.message);
  return { attendee: data, isPending };
};
export default useGetAttendee;
