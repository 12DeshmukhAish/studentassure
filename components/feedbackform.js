"use client"
import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    feedbackTitle: '',
    subjectId: '',
    teacher: '',
    questions: '',
    numberOfStudents: '',
    pwd: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
      await axios.post('/api/feedback', formData);
      setSubmitted(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-[50vw]">
      <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
      <div className="mb-4">
        <label htmlFor="feedbackTitle" className="block mb-2">Feedback Title:</label>
        <input
          type="text"
          id="feedbackTitle"
          name="feedbackTitle"
          value={formData.feedbackTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="subjectId" className="block mb-2">Subject ID:</label>
        <input
          type="text"
          id="subjectId"
          name="subjectId"
          value={formData.subjectId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="teacher" className="block mb-2">Teacher:</label>
        <input
          type="text"
          id="teacher"
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="questions" className="block mb-2">Questions:</label>
        <textarea
          id="questions"
          name="questions"
          value={formData.questions}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="numberOfStudents" className="block mb-2">Number of Students:</label>
        <input
          type="number"
          id="numberOfStudents"
          name="numberOfStudents"
          value={formData.numberOfStudents}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="pwd" className="block mb-2">Password:</label>
        <input
          type="password"
          id="pwd"
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit Feedback
      </button>
      {submitted && (
        <p className="text-green-600">Feedback submitted successfully!</p>
      )}
    </form>
    </div>
  );
};

export default FeedbackForm;
