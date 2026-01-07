"use client";
import useGetEvents from "@/queries/useGetEvents";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import useDeleteEvent from "@/queries/useDeleteEvent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";

const EventsList = () => {
  const { data: events, isLoading } = useGetEvents();
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const { deleteEventAction, isPending: isPendingDeleteEvent } =
    useDeleteEvent();

  if (isLoading) {
    return (
      <div className="flex justify-center  h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }
  if (events?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No Events Found
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-6">
      {events?.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-bold">Event Description:</span>
              {event.description}
            </p>
            <p>
              <span className="font-bold">Event Date:</span>
              {formatDate(event.date)}
            </p>
            <p>
              <span className="font-bold">Event Capacity:</span>
              {event.capacity}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/events/${event.id}/edit-event`}>Edit Event</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-red-500">Delete Event</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Deleting this event will permanently delete all attendees
                      associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setDeletingEventId(event.id);
                        deleteEventAction(event.id);
                      }}
                    >
                      {isPendingDeleteEvent ? "Deleting..." : "Continue"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div>
              <Button asChild>
                <Link href={`/events/${event.id}/view-attendees`}>
                  View Attendees
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default EventsList;
