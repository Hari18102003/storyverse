import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/libs/connectDB";
import { Story } from "@/libs/models/Story";
import { User } from "@/libs/models/User";
import { getServerSession } from "next-auth";

export async function DELETE(req, { params }) {
    connectDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const { id } = params;
    await Story.findOneAndDelete({ _id: id });
    await User.findOneAndUpdate({ email }, { $pull: { stories: id } });
    return Response.json({
        success: true,
        message: "Deleted Story!"
    });

}