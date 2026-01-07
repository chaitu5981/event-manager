import { createEvent } from "@/actions/event.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { createEventSchema } from "@/lib/validators";
const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createEventAction, isPending } = useMutation({
    mutationFn: async (event: z.infer<typeof createEventSchema>) => {
      const response = await createEvent(event);
      if (!response.success) {
        throw new Error(response.error);
      } else {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["events"] });
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createEventAction, isPending };
};
export default useCreateEvent;
