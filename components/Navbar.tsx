import Link from "next/link";
import EventIcon from "@mui/icons-material/Event";

const Navbar = () => {
  return (
    <>
      <header className="px-8 py-4">
        <nav className="flex justify-between">
          <Link className="flex gap-2 items-center justify-between" href="/">
            <EventIcon fontSize="large" />
            <p className="text-2xl">DevEvent</p>
          </Link>

          <ul className="flex gap-6 justify-between">
            <Link href="/">Home</Link>
            <Link href="/">Events</Link>
            <Link href="/">Create Event</Link>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
