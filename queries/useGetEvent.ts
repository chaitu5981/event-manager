import { getEventById } from "@/actions/event.actions";
import { useQuery } from "@tanstack/react-query";

const useGetEvent = (eventId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });
  return { data, isPending };
};
export default useGetEvent;
