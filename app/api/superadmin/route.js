import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectDb";
import Register from "@/app/models/department";

export async function POST(req) {
    try {
        await connectMongoDB();
        const data = await req.json();
        console.log(data);

        const {  department, username, password } = data;

        const newRegister = new Register({
            department,
            username,
            password

        });

        await newRegister.save();
        console.log("Department Registered Successfully");
        console.log(newRegister);
        return NextResponse.json({ message: "Department Registered Successfully", register: newRegister });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to  Register" });
    }
}
