import { updateAttendee } from "@/actions/attendee.actions";
import { addAttendeeSchema } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const useUpdateAttendee = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: updateAttendeeAction, isPending } = useMutation({
    mutationFn: ({
      attendeeId,
      attendee,
    }: {
      attendeeId: string;
      attendee: z.infer<typeof addAttendeeSchema>;
    }) => updateAttendee(attendeeId, attendee),
    onSuccess: () => {
      toast.success("Attendee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["attendees"] });
      router.back();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateAttendeeAction, isPending };
};

export default useUpdateAttendee;
