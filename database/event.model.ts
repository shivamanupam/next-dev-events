import mongoose, { Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organize: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 140,
    },

    description: {
      type: String,
      required: true,
      maxlength: 500,
    },

    overview: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      required: true,
      enum: ["online", "offline", "hybrid"],
    },

    audience: {
      type: String,
      required: true,
      maxlength: 150,
    },

    agenda: {
      type: [String],
      required: true,
      default: [],
    },

    organize: {
      type: String,
      required: true,
      maxlength: 120,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

EventSchema.pre("save", function (next) {
  const event = this as IEvent;

  if (event.isModified("title") || this.ENTITY_NODE.isNew) {
    event.slug = generateSlug(event.title);
  }

  if (event.isModified("date")) {
    event.date = normalizeDate(event.date);
  }

  if (event.isModified("time")) {
    event.time = normalizeTime(event.time);
  }

  next();
});

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with hyphen
    .replace(/--+/g, "-"); // remove multiple hyphens
}

export function normalizeDate(dateInput: string | Date): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date.toISOString().split("T")[0];
}

export function normalizeTime(timeInput: string): string {
  const [hoursStr, minutesStr] = timeInput.split(":");

  let hours = parseInt(hoursStr);
  const minutes = minutesStr.padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes} ${period}`;
}

export const Event = models.Event || model<IEvent>("Event", EventSchema);
