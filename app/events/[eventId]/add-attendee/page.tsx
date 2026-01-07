import AddUpdateAttendeeForm from "@/components/add-edit-attendee-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AddAttendeePage = async ({
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

      <AddUpdateAttendeeForm eventId={eventId} />
    </div>
  );
};
export default AddAttendeePage;
