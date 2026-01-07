import { getEventById } from "@/actions/event.actions";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetEvent = (eventId: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const response = await getEventById(eventId);
      if (!response.success) {
        throw new Error(response.error);
      } else {
        return response.event;
      }
    },
    enabled: !!eventId,
  });
  if (error) {
    toast.error(error.message);
  }
  return { data, isPending };
};
export default useGetEvent;
