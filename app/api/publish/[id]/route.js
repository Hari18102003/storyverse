import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";
import { User } from "@/libs/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req, { params }) {
    connectDB();
    const { id } = params;
    const { title, image, category, story, description } = await req.json();
    const session = await getServerSession(authOptions);
    await User.findOneAndUpdate({ email: session?.user?.email }, { $pull: { drafts: id } });
    await Story.findOneAndUpdate({ _id: id }, { title, image, category, story, description, draft: false });
    await User.findOneAndUpdate({ email: session?.user?.email }, { $push: { stories: id } });
    return Response.json({
        success: true,
        message: "Published"
    });
}