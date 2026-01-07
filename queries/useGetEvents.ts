import { getEvents } from "@/actions/event.actions";
import { useQuery } from "@tanstack/react-query";

const useGetEvents = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await getEvents();
      if (!response.success) {
        throw new Error(response.error);
      } else {
        return response.events;
      }
    },
  });
  return { data, isLoading, error };
};
export default useGetEvents;
