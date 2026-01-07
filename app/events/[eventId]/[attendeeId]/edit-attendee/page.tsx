import AddUpdateAttendeeForm from "@/components/add-edit-attendee-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditAttendee = async ({
  params,
}: {
  params: Promise<{ eventId: string; attendeeId: string }>;
}) => {
  const { eventId, attendeeId } = await params;
  return (
    <div className="flex flex-col items-center">
      <Button asChild className="mb-4 ml-auto">
        <Link href="/">View Events</Link>
      </Button>

      <AddUpdateAttendeeForm eventId={eventId} attendeeId={attendeeId} />
    </div>
  );
};
export default EditAttendee;
