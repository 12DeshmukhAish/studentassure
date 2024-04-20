"use client"
import React, { useState, useEffect } from 'react';
import QuestionForm from '@/components/questionsForm';
import QuestionsList from '@/components/questionsList';

import axios from 'axios';

const FeedbackManager = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(true);
  const [savedQuestions, setSavedQuestions] = useState([]);

  useEffect(() => {
    const fetchSavedQuestions = async () => {
      try {
        const data = await axios.get("/api/getquestions")
        console.log(data.data.questions);
        setSavedQuestions(data.data.questions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedQuestions();
  }, []);

  const handleAddFeedback = () => {
    setShowFeedbackForm(true);
  };
  const handleDelete = async (index) => {
    try {
      console.log("delete quetions",index);
      const response = await fetch(`/api/feedback/${savedQuestions[index]._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted feedback item from the savedQuestions state
        const updatedQuestions = [...savedQuestions];
        updatedQuestions.splice(index, 1);
        setSavedQuestions(updatedQuestions);
      } else {
        console.error('Failed to delete feedback item');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowQuestions = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div className='h-screen'>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={handleAddFeedback}
        >
          Add Questions
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleShowQuestions}
        >
          Show Questions
        </button>
      </div>
      {showFeedbackForm ? (
        <QuestionForm onQuestionsSaved={(newQuestions) => setSavedQuestions([...savedQuestions, ...newQuestions])} />
      ) : (
        <QuestionsList questions={savedQuestions}
        onDelete={handleDelete} />
      )}
    </div>
  );
};

export default FeedbackManager;