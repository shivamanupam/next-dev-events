export type Event = {
  title: string;
  image: string;
  slug: string;
  date: string;
  time: string;
  location: string;
};

const events: Event[] = [
  {
    title: "IND vs NZ T20 WC Finals",
    image: "/images/image1.jpg",
    slug: "t20-wc-finals",
    date: "2026-04-10",
    time: "10:00 AM",
    location: "Ahemadabad, India",
  },
  {
    title: "Silas Holi Celebration",
    image: "/images/image2.jpg",
    slug: "silas-holi-celebration",
    date: "2026-04-18",
    time: "02:00 PM",
    location: "Bangalore, India",
  },
  {
    title: "Arijit Singh Concert",
    image: "/images/image3.jpg",
    slug: "arijit-singh-concert",
    date: "2026-05-02",
    time: "11:30 AM",
    location: "Delhi, India",
  },
];

export default events;
