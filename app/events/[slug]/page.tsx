import Image from "next/image";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { normalizeStringArray } from "@/lib/utils/normalizeArray";
import BookEvent from "@/components/BookEvent";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  "use cache";

  cacheLife("hours");

  const { slug } = await params;

  const res = await fetch(`${BASE_URL}/api/events/${slug}`);

  const { event } = await res.json();

  const tags = normalizeStringArray(event.tags);

  if (!event) throw Error("Event not found");

  return (
    <>
      <div className="flex mx-8 justify-between">
        <section className="mt-8">
          <h1 className="text-4xl">Event | {event.title} </h1>
          <Image
            src={event.image}
            width={800}
            height={310}
            className="my-8"
            alt="Karan Aujila Live Show"
          />

          <div className="my-8 w-200 flex flex-col gap-4">
            <h2 className="text-2xl">Description</h2>
            <p>{event.description} </p>
          </div>

          <div className="my-8 w-200 flex flex-col gap-4">
            <h2 className="text-2xl">Overview</h2>
            <p>{event.overview} </p>
          </div>

          <div className="my-8 w-200 flex flex-col gap-4">
            <h2 className="text-2xl">Event Details:</h2>
            <div className="flex flex-row gap-2">
              <LocationPinIcon />
              <p>{event.location} </p>
            </div>
            <div className="flex flex-row gap-2">
              <CalendarMonthIcon />
              <p>{event.date} </p>
            </div>
            <div className="flex flex-row gap-2">
              <AccessTimeIcon />
              <p>{event.time} </p>
            </div>
            <div className="flex flex-row gap-2">
              <GroupIcon />
              <p>{event.audience} </p>
            </div>
            <div className="flex flex-row gap-2">
              <CorporateFareIcon />
              <p>{event.organize} </p>
            </div>

            <div className="flex gap-8">
              {tags.length > 0 &&
                tags?.map((tag: string) => {
                  return (
                    <div key={tag} className="border px-4 py-2 rounded-lg">
                      {tag}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>

        <BookEvent eventId={event._id} />
      </div>
    </>
  );
};

export default EventDetailsPage;
