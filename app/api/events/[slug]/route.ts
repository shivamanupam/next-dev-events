import { Event  } from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Missing Slug or parameter" },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    const event = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    if (!event)
      return NextResponse.json(
        { message: "Event with this slug name not found." },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
  }
}
