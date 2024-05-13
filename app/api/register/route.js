import { connectDB } from "@/libs/connectDB";
import { User } from "@/libs/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    connectDB();
    const { username, email, password } = await req.json();
    const user = await User.findOne({ email });
    if (user) {
        return Response.json({
            success: false,
            message: "This Email already exists!"
        });
    }
    const hashed = bcrypt.hashSync(password, 10);
    await User.create({ username, email, password: hashed });
    return Response.json({
        success: true,
        message: "Account Created"
    });
}