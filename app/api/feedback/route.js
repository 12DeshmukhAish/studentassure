import { connectMongoDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Feedback from "@/app/models/feedback";
export async function POST(req) {
    try {

        await connectMongoDB();
        const {feedbackTitle,teacher,subject,students} = await req.json();
        console.log(data);
        const newFeedback = new Feedback(data);
        await newFeedback.save();
        console.log("Request send Successfully");
        return NextResponse.json({message:"request send"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error});
    }
}