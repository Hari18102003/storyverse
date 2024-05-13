import { connectDB } from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";
import { Story } from "@/libs/models/Story";

export async function PUT(req) {
    connectDB();
    const { id } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await User.findOneAndUpdate({ email }, { $push: { readings: id } });
    await Story.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } });
    return Response.json({
        success: true
    });
}