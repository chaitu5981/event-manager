"use client";
import useGetAttendees from "@/queries/useGetAttendees";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { shortenId } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import useDeleteAttendee from "@/queries/useDeleteAttendee";

const AttendeeTable = ({ eventId }: { eventId: string }) => {
  const { attendees, isPending: isGetAttendeesPending } =
    useGetAttendees(eventId);
  const { deleteAttendeeAction, isPending: isDeleteAttendeePending } =
    useDeleteAttendee();
  if (isGetAttendeesPending) {
    return (
      <div className="flex justify-center  h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }
  if (attendees?.length === 0) {
    return (
      <div className="flex justify-center  h-screen">
        <p className="text-2xl font-bold">
          No attendees found for Event {shortenId(eventId)}
        </p>
      </div>
    );
  }
  return (
    <Card className="w-full p-4 max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Attendees for Event {shortenId(eventId)}
        </CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees?.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>{attendee.name}</TableCell>
              <TableCell>{attendee.email}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/events/${eventId}/${attendee.id}/edit-attendee`}
                  >
                    <Pencil className="w-4 h-4" color="blue" />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" color="red" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogDescription>
                        Are you sure you want to delete this attendee
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteAttendeeAction(attendee.id);
                        }}
                      >
                        {isDeleteAttendeePending ? "Deleting..." : "Continue"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
export default AttendeeTable;
