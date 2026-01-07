import { createEvent } from "@/actions/event.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createEventAction, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully");
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create event");
    },
  });
  return { createEventAction, isPending };
};
export default useCreateEvent;
