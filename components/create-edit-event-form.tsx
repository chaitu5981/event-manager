"use client";
import { createEventSchema } from "@/lib/validators";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import useCreateEvent from "@/queries/useCreateEvent";
import { Card } from "@/components/ui/card";
import useGetEvent from "@/queries/useGetEvent";
import useUpdateEvent from "@/queries/useUpdateEvent";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
const CreateEditEvent = ({ eventId }: { eventId?: string }) => {
  const { data: event, isPending: isPendingGetEvent } = useGetEvent(
    eventId ?? ""
  );
  console.log("event", event);
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      date: event?.date || new Date(),
      capacity: event?.capacity || 0,
    },
  });
  const { createEventAction, isPending: isPendingCreateEvent } =
    useCreateEvent();
  const { updateEventAction, isPending: isPendingUpdateEvent } =
    useUpdateEvent();
  useEffect(() => {
    if (event && eventId) {
      form.reset({
        title: event.title,
        description: event.description,
        date: event.date,
        capacity: event.capacity,
      });
    }
  }, [event, eventId, form]);
  const onSubmit = async (data: z.infer<typeof createEventSchema>) => {
    if (eventId) {
      return updateEventAction({ eventId, event: data });
    } else {
      createEventAction(data);
    }
    form.reset();
  };
  if (isPendingGetEvent && eventId) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <Card className="w-full px-5">
        <h1 className="text-2xl font-bold text-center my-5">
          {eventId ? "Edit" : "Create"} Event
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <CalendarIcon />
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4"
              disabled={isPendingCreateEvent || isPendingUpdateEvent}
            >
              {isPendingCreateEvent || isPendingUpdateEvent
                ? "Submitting..."
                : "Submit"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
export default CreateEditEvent;
