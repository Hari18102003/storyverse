import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";

export async function POST(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const user = await User.findOne({ email: session?.user?.email });
    const { title, image, category, story, description } = await req.json();
    const newStory = await Story.create({ title, image, category, story, description, draft: true });
    await User.findOneAndUpdate({ _id: user._id }, { $push: { drafts: newStory._id } });
    await Story.findOneAndUpdate({ _id: newStory._id }, { creator: user._id });
    return Response.json({
        success: true,
        message: "Saved as Draft"
    });
}