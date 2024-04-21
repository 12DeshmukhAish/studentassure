// pages/api/register.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectDb";
import Department from "@/app/models/department"; // Assuming you have a model for departments

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract department data from request body
      const { name, classes } = req.body;

      // Create a new department instance
      const newDepartment = new Department({
        department,
        username
       
      });

      // Save the new department to the database
      await newDepartment.save();

      // Fetch all departments from the database
      const departments = await Department.find();

      // Return the updated list of departments
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register department' });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ error: 'Method not allowed' });
  }
}
