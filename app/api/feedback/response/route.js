import { connectMongoDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Response from "@/app/models/response";
export async function POST(req) {
    try {

        await connectMongoDB();
        const {feedback_id,subject_id,responses,date} = await req.json();
        console.log(data);
        const newResponse = new Response(data);
        await newResponse.save();
        console.log("Response  send Successfully");
        return NextResponse.json({message:"request send"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error});
    }
}