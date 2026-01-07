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
    mutationFn: (data: z.infer<typeof addAttendeeSchema>) => addAttendee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Attendee added successfully");
      router.back();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addAttendeeAction, isPending };
};
export default useAddAttendee;
