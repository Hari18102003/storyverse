import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";
import { User } from "@/libs/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    connectDB();
    const { title, image, category, story, description } = await req.json();
    const session = await getServerSession(authOptions);
    const user = await User.findOne({ email: session?.user?.email });
    const newStory = await Story.create({ title, image, category, story, description, draft: false });
    await User.findOneAndUpdate({ email: session?.user?.email }, { $push: { stories: newStory._id } });
    await Story.findOneAndUpdate({ _id: newStory._id }, { creator: user._id });
    return Response.json({
        success: true,
        message: "Published"
    });
}