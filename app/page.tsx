import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";
// import events from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  const res = await fetch(`${BASE_URL}/api/events`);

  const { events } = await res.json();

  return (
    <>
      <section className="text-center my-4">
        <h1 className="text-4xl">Welcome to the Events Hub</h1>
        <p className="mt-5">Place for every event happening in the town</p>

        <ExploreBtn />

        <div className="mt-20 space-y-7">
          <h3 className="text-2xl text-left mx-8">Featured Events</h3>
          <ul className="mx-8 flex flex-row justify-between">
            {events &&
              events.length > 0 &&
              events.map((event: IEvent) => (
                <li key={event.title}>
                  <EventCard {...event} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
