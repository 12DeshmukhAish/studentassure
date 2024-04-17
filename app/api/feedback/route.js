import { connectMongoDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Feedback from "@/app/models/feedback";
export async function POST(req) {
    try {

        await connectMongoDB();
        const data = await req.json();
        console.log(data);
        const newFeedback = new Feedback(data);
        await newFeedback.save();
        console.log("Feedback Created Successfully");
        return NextResponse.json({message:"Feedback Created Successfully"},newFeedback);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error});
    }
}