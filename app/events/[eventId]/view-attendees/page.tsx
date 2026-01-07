import { Button } from "@/components/ui/button";
import Link from "next/link";
import AttendeeTable from "@/components/attendee-table";

const ViewAttendees = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;
  return (
    <div className="flex flex-col items-center">
      <Button asChild className="mb-4 ml-auto">
        <Link href="/">View Events</Link>
      </Button>
      <Button asChild className="mb-4 ml-auto">
        <Link href={`/events/${eventId}/add-attendee`}>Add Attendee</Link>
      </Button>
      <AttendeeTable eventId={eventId} />
    </div>
  );
};
export default ViewAttendees;
