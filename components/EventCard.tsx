import { Event } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const EventCard = ({ title, image, slug, location, date, time }: Event) => {
  return (
    <>
      <Link href={`/events/${slug}`} className="flex flex-col gap-4">
        <Image src={image} height={300} width={410} alt={title} />
        <div className="text-left flex flex-col gap-2">
          <div className="flex flex-row gap-1 items-center">
            <LocationPinIcon fontSize="small" />
            <p>{location} </p>
          </div>
          <p className="text-xl">{title} </p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-1">
              <CalendarMonthIcon fontSize="small" />
              <p>{date} </p>
            </div>
            <div className="flex flex-row gap-1">
              <AccessTimeIcon />
              <p>{time} </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EventCard;
