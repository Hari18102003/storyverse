import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";
import { User } from "@/libs/models/User";

export async function GET(req) {
    connectDB();
    const users = await User.find();
    const creators = await User.find({ "stories": { $exists: true, $not: { $size: 0 } } });
    const stories = await Story.find();
    return Response.json({
        success: true,
        readers: users.length,
        stories: stories.length,
        creators: creators.length
    });
}