import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateEditEvent from "@/components/create-edit-event-form";

const page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = await params;
  return (
    <div className="flex flex-col items-center">
      <Button asChild className="mb-4 ml-auto">
        <Link href="/">View Events</Link>
      </Button>
      <CreateEditEvent eventId={eventId} />
    </div>
  );
};
export default page;
