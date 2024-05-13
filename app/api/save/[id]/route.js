import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";

export async function POST(req, { params }) {
    connectDB();
    const { id } = params;
    const { title, image, category, story, description } = await req.json();
    await Story.findOneAndUpdate({ _id: id }, { title, image, category, story, description, draft: true });
    return Response.json({
        success: true,
        message: "Saved as Draft"
    });
}