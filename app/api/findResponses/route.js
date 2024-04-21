import { connectMongoDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Response from "@/app/models/response";
export async function GET() {
    try {
        await connectMongoDB();
        const response = await Response.find();
        console.log(response);
        console.log("Fetched Data Successfully");
        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error});
    }
}