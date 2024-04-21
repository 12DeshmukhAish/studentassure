// /app/(main)/super_admin/departments/page.js
"use client"
// /app/(main)/super_admin/departments/page.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterPage from '@/components/adminregister';

const Page = () => {
  // State to hold departments data
  const [departments, setDepartments] = useState([]);

  // Fetch departments data from API or backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Replace with actual API endpoint to fetch departments
        const response = await axios.get('/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className='h-screen overflow-y-auto container mx-auto p-4'>
      <h1 className="text-2xl font-bold mb-4">Manage Departments</h1>

      {/* Departments Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Registered Departments</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Class</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td className="border border-gray-300 px-4 py-2">{department.id}</td>
                <td className="border border-gray-300 px-4 py-2">{department.name}</td>
                <td className="border border-gray-300 px-4 py-2">{department.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Register Department Section */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Register Department</h1>
        <RegisterPage />
      </div>
    </div>
  );
};

export default Page;
