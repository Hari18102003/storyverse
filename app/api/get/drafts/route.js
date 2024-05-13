import { connectDB } from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";

export async function GET(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email }).populate("drafts");
    return Response.json({
        success: true,
        stories: user.drafts
    });
}