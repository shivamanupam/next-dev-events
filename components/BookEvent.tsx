"use client";

import { createBooking } from "@/lib/booking.actions";
import { useState } from "react";

const BookEvent = ({ eventId }: { eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleBooking = async (event: Event) => {
    event.preventDefault();

    const { success, error } = await createBooking({ eventId, email });

    if (success) {
      setSubmitted(true);
    } else {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      {!submitted ? (
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleBooking}
        >
          <p>Interested in the Event??</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2"
            placeholder="Enter your email address"
          />
          <button className="border cursor-pointer rounded-md px-4 py-2">
            Book
          </button>
        </form>
      ) : (
        <>
          <p>Thank you for showing intetest in this event!</p>
        </>
      )}
    </>
  );
};

export default BookEvent;
