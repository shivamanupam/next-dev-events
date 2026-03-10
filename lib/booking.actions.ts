"use server";

import { Booking } from "@/database/booking.model";
import connectDB from "./mongodb";

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
  slug: string;
}) => {
  try {
    await connectDB();

    const booking = (await Booking.create({ eventId, email })).lean();

    return { success: true, booking };
  } catch (err) {
    console.log(err);
  }
};
