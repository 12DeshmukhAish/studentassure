"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResponseForm = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [formData, setFormData] = useState({
    feedback_id: '',
    subject_id: '',
    ratings: {}, // Store ratings for each question
    suggestions: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/feedbackData');
        setFeedbacks(response.data.feedbackData);
      } catch (error) {
        setError('Error fetching feedbacks');
      }
    };

    fetchData();
  }, []);

  const handleSelectFeedback = (feedbackId) => {
    const selectedFeedback = feedbacks.find((feedback) => feedback._id === feedbackId);
    const initialRatings = selectedFeedback.questions.reduce((acc, question) => {
      acc[question] = ''; // Initialize ratings for each question
      return acc;
    }, {});
    setSelectedFeedback(selectedFeedback);
    setFormData({
      ...formData,
      feedback_id: feedbackId,
      ratings: initialRatings,
    });
  };

  const handleChange = (question, rating) => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        [question]: rating,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/response', formData);
      setSubmitted(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Submit Response</h2>
        {error && <p className="text-red-600">{error}</p>}
        <div className="mb-4">
          <label htmlFor="feedbackSelect" className="block mb-2">Select Feedback:</label>
          <select
            id="feedbackSelect"
            name="feedback_id"
            value={formData.feedback_id}
            onChange={(e) => handleSelectFeedback(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Feedback</option>
            {feedbacks.map((feedback) => (
              <option key={feedback._id} value={feedback._id}>
                {feedback.feedbackTitle}
              </option>
            ))}
          </select>
        </div>
        {selectedFeedback && (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-[50vw]">
            {selectedFeedback.questions.map((question) => (
              <div key={question} className="mb-4">
                <label className="block mb-2">{question}</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <React.Fragment key={rating}>
                      <input
                        type="radio"
                        id={`${question}-${rating}`}
                        name={question}
                        value={rating}
                        checked={formData.ratings[question] === rating}
                        onChange={() => handleChange(question, rating)}
                        className="mr-2"
                      />
                      <label htmlFor={`${question}-${rating}`} className="mr-4">{rating}</label>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            <div className="mb-4">
              <label htmlFor="suggestions" className="block mb-2">Suggestions:</label>
              <textarea
                id="suggestions"
                name="suggestions"
                value={formData.suggestions}
                onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
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
          </form>
        )}
      </div>
    </div>
  );
};

export default ResponseForm;
