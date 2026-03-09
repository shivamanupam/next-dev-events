import { Schema, model, models } from "mongoose";

export interface IBooking extends Document {
  eventId: Schema.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowerCase: true,
      validate: {
        validator: function (email: string) {
          const rfc5322EmailRegex =
            /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})\]))$/;

          return rfc5322EmailRegex.test(email);
        },
        message: "Please provide a valid email address.",
      },
    },
  },
  { timestamps: true }
);

BookingSchema.pre("save", async function (next) {
  const booking = this as IBooking;

  if (booking.isModified("eventId") || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select("_id");

      if (!eventExists) {
        const error = new Error(
          `Event with ID ${booking.eventId} does not exist.`
        );
        error.name = "ValidationError";

        return next(error);
      }
    } catch (err) {
      const validationError = new Error("Validation Error");
      validationError.name = "ValidationError";

      return next(validationError);
    }
  }

  next();
});

BookingSchema.index({ eventId: 1 });

BookingSchema.index({ eventId: 1, createdAt: -1 });

BookingSchema.index({ email: 1 });

export const Booking =
  models.Booking || model<IBooking>("Booking", BookingSchema);
