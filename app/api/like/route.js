import { connectDB } from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";
import { Story } from "@/libs/models/Story";

export async function PUT(req) {
    connectDB();
    const { id } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });
    if (user.likedstories.includes(id)) {
        await User.findOneAndUpdate({ email }, { $pull: { likedstories: id } });
        await Story.findOneAndUpdate({ _id: id }, { $inc: { likes: -1 } });
        return Response.json({
            success: true,
            message: "Disliked"
        });
    } else {
        await User.findOneAndUpdate({ email }, { $push: { likedstories: id } });
        await Story.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } });
        return Response.json({
            success: true,
            message: "Liked a Story"
        });
    }

}