import { connectMongoDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Response from "@/app/models/response";

export async function POST(req) {
    try {
        await connectMongoDB();

        const { feedback_id, subject_id, responses, suggestions } = await req.json();

        // Ensure responses is an array
        const formattedResponses = Array.isArray(responses) ? responses : [];
console.log(formattedResponses);
        // Create a new Response document
        const newResponse = new Response({
            feedback_id,
            subject_id,
            ratings: formattedResponses,
            suggestions,
            date: new Date() 
        });

        // Save the new response document to the database
        await newResponse.save();

        console.log("Response sent successfully");
        console.log(newResponse);

        // Respond with success message
        return NextResponse.json({ message: "Response saved successfully" });
    } catch (error) {
        // Handle errors and respond with error message
        console.error("Error saving response:", error);
        return NextResponse.json({ error: "Error saving response" });
    }
}
