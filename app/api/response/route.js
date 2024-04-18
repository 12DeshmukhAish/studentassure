import { connectMongoDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Response from "@/app/models/response";

export async function POST(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Extract data from the request body
        const { feedback_id, subject_id, responses, suggestions } = await req.json();

        // Convert the responses object into an array of objects
        const formattedResponses = Object.entries(responses).map(([question_id, rating]) => ({
            question_id,
            rating
        }));
console.log(formattedResponses);
        // Create a new response object with the received data
        const newResponse = new Response({
            feedback_id,
            subject_id,
            ratings: formattedResponses,
            suggestions,
            date: new Date() // Set the current date
        });

        // Save the new response to the database
        await newResponse.save();
        console.log("Response sent successfully");
        console.log(newResponse);

        // Send a success response
        return NextResponse.json({ message: "Response saved successfully" });
    } catch (error) {
        // Log and send back the error
        console.error("Error saving response:", error);
        return NextResponse.json({ error: "Error saving response" });
    }
}
