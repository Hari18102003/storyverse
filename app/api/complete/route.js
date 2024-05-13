import { connectDB } from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";

export async function PUT(req) {
    connectDB();
    const { id } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await User.findOneAndUpdate({ email }, { $pull: { readings: id } });
    return Response.json({
        success: true,
        message: "completed"
    });
}