import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div>
        <div className="flex gap-4 justify-end">
          <Button variant="default" asChild>
            <Link href="/create-event">Create Event</Link>
          </Button>
          <Button variant="default">Add Attendee</Button>
        </div>
      </div>
    </div>
  );
};
export default Home;
