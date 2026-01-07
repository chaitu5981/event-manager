import { addAttendee } from "@/actions/attendee.actions";
import { addAttendeeSchema } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { useRouter } from "next/navigation";

const useAddAttendee = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: addAttendeeAction, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof addAttendeeSchema>) => {
      const response = await addAttendee(data);
      if (!response.success) {
        throw new Error(response.error);
      } else {
        toast.success(response.message);
        queryClient.invalidateQueries({
          queryKey: ["attendees", data.eventId],
        });
        router.back();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addAttendeeAction, isPending };
};
export default useAddAttendee;
