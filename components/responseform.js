"use client"
import React, { useState } from 'react';
import axios from 'axios';
const ResponseForm = () => {
    const [formData, setFormData] = useState({
      feedback_id: '',
      subject_id: '',
      question: '',
      rating: '',
      suggestions: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Send a POST request to the API route with form data
        await axios.post('/api/response', formData);
        setSubmitted(true);
      } catch (error) {
        setError(error.response.data.error);
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-[50vw]">
          <h2 className="text-2xl font-semibold mb-4">Submit Response</h2>
          
          <div className="mb-4">
            <label htmlFor="feedback_id" className="block mb-2">Feedback ID:</label>
            <input
              type="text"
              id="feedback_id"
              name="feedback_id"
              value={formData.feedback_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="subject_id" className="block mb-2">Subject ID:</label>
            <input
              type="text"
              id="subject_id"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="question" className="block mb-2">Question:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="rating" className="block mb-2">Rating:</label>
            <input
              type="text"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="suggestions" className="block mb-2">Suggestions:</label>
            <input
              type="text"
              id="suggestions"
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit Response
          </button>
  
          {submitted && (
            <p className="text-green-600">Response submitted successfully!</p>
          )}
  
          {error && (
            <p className="text-red-600">Error: {error}</p>
          )}
        </form>
      </div>
    );
  };
  
  export default ResponseForm;