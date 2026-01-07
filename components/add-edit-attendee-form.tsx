"use client";
import { addAttendeeSchema } from "@/lib/validators";
import useAddAttendee from "@/queries/useAddAttendee";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { shortenId } from "@/lib/utils";
import useGetAttendee from "@/queries/useGetAttendee";
import { useEffect } from "react";
import useUpdateAttendee from "@/queries/useUpdateAttendee";
import { Loader2 } from "lucide-react";
const AddUpdateAttendeeForm = ({
  eventId,
  attendeeId,
}: {
  eventId: string;
  attendeeId?: string;
}) => {
  const { addAttendeeAction, isPending: isPendingAddAttendee } =
    useAddAttendee();
  const { updateAttendeeAction, isPending: isPendingUpdateAttendee } =
    useUpdateAttendee();
  const { attendee, isPending: isPendingGetAttendee } = useGetAttendee(
    attendeeId ?? ""
  );
  const form = useForm<z.infer<typeof addAttendeeSchema>>({
    resolver: zodResolver(addAttendeeSchema),
    defaultValues: {
      name: "",
      email: "",
      eventId: eventId,
    },
  });
  useEffect(() => {
    if (attendeeId) {
      form.reset({
        name: attendee?.name,
        email: attendee?.email,
        eventId,
      });
    }
  }, [attendeeId, attendee, form]);
  const onSubmit = (data: z.infer<typeof addAttendeeSchema>) => {
    if (attendeeId) return updateAttendeeAction({ attendeeId, attendee: data });
    else addAttendeeAction(data);
    form.reset();
  };
  if (isPendingGetAttendee && attendeeId)
    return (
      <div className="flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  return (
    <Card className="w-full max-w-xl px-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {attendeeId ? "Update" : "Add"} Attendee for Event{" "}
          {shortenId(eventId)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPendingAddAttendee || isPendingUpdateAttendee}
              >
                {isPendingAddAttendee || isPendingUpdateAttendee
                  ? "Submitting..."
                  : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
export default AddUpdateAttendeeForm;
