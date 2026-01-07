import { Button } from "@/components/ui/button";
import EventsList from "@/components/events-list";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div>
        <div className="flex gap-4 justify-end">
          <Button variant="default" asChild>
            <Link href="/create-event">Create Event</Link>
          </Button>
        </div>
      </div>
      <EventsList />
    </div>
  );
};
export default Home;
