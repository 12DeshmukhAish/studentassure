import { connectMongoDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Response from "@/app/models/faculty";
export async function POST(req) {
    try {

        await connectMongoDB();
        const {departments} = await req.json();
        console.log(data);
        const newFaculty = new Response(data);
        await newFaculty.save();
        console.log("Faculty added successfully");
        return NextResponse.json({message:"Faculty added"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error});
    }
}