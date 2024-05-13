import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";

export async function GET(req, { params }) {
    connectDB();
    const { id } = params;
    const story = await Story.findOne({ _id: id }).populate("creator");
    return Response.json({
        success: true,
        story
    });
}