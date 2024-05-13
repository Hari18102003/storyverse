import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";
export const dynamic = "force-dynamic";
export async function GET(req) {
    connectDB();
    const stories = await Story.find().populate("creator").where('draft').equals(false).sort({ createdAt: "desc" });
    return Response.json({
        success: true,
        stories
    });
}