"use client"
import React, { useState } from 'react';
import axios from 'axios';

const Superadmin_FeedbackForm = () => {
  const [formData, setFormData] = useState({
    feedbackTitle: '',
    class: '',
    department: '',
    feedbackType: '',
    questions: [''],
    pwd: '',
    isActive: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('question')) {
      const newQuestions = [...formData.questions];
      newQuestions[index] = value;
      setFormData({
        ...formData,
        questions: newQuestions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, ''],
    });
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post('/api/feedback', formData);
      setSubmitted(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="feedbackTitle" className="block mb-2">Feedback Title:</label>
          <input
            type="text"
            id="feedbackTitle"
            name="feedbackTitle"
            value={formData.feedbackTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter feedback title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="class" className="block mb-2">Class:</label>
          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Class</option>
            <option value="FY">FY</option>
            <option value="SY">SY</option>
            <option value="TY">TY</option>
            <option value="Final Year">Final Year</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block mb-2">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="First Year">First Year</option>
            <option value="ENTC">ENTC</option>
            <option value="Electrial">Electrial</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="feedbackType" className="block mb-2">Feedback Type:</label>
          <select
            id="feedbackType"
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Feedback Type</option>
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
          </select>
        </div>
        {formData.questions.map((question, index) => (
          <div className="mb-4" key={index}>
            <label htmlFor={`question${index}`} className="block mb-2">Question {index + 1}:</label>
            <div className="flex">
              <input
                type="text"
                id={`question${index}`}
                name={`question${index}`}
                value={question}
                onChange={(e) => handleChange(e, index)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter question"
              />
              <button
                type="button"
                className="ml-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
        <div className="mb-4">
          <label htmlFor="pwd" className="block mb-2">Password:</label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isActive" className="block mb-2">Activate Feedback:</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor="isActive" className="mr-4">Yes</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit Feedback
        </button>
        {submitted && (
          <p className="mt-4 text-green-600">Feedback submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Superadmin_FeedbackForm;
