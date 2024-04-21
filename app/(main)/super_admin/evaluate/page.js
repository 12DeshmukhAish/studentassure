"use client"
import React, { useState,useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
const EvaluationPage = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [feedbackData, setFeedbackData] = useState([
    
  {
      "_id": "66250af5e4e04c09b251e616",
      "feedback_id": "662504bce4e04c09b251e60c",
      "ratings": [
          {
              "subject_id": "s111",
              "suggestions": "No suggetion",
              "ratings": [
                  5,
                  4,
                  5,
                  4,
                  5,
                  4,
                  5
              ],
              "_id": "66250af5e4e04c09b251e617"
          },
          {
              "subject_id": "s112",
              "suggestions": "",
              "ratings": [
                  5,
                  5,
                  5,
                  5,
                  4,
                  5,
                  4
              ],
              "_id": "66250af5e4e04c09b251e618"
          },
          {
              "subject_id": "s113",
              "suggestions": "",
              "ratings": [
                  5,
                  4,
                  5,
                  5,
                  5,
                  5,
                  5
              ],
              "_id": "66250af5e4e04c09b251e619"
          },
          {
              "subject_id": "s114",
              "suggestions": "",
              "ratings": [
                  5,
                  5,
                  5,
                  1,
                  1,
                  5,
                  5
              ],
              "_id": "66250af5e4e04c09b251e61a"
          },
          {
              "subject_id": "s115",
              "suggestions": "",
              "ratings": [
                  5,
                  5,
                  5,
                  5,
                  1,
                  5,
                  5
              ],
              "_id": "66250af5e4e04c09b251e61b"
          },
          {
              "subject_id": "s116",
              "suggestions": "",
              "ratings": [
                  5,
                  5,
                  5,
                  5,
                  5,
                  5,
                  5
              ],
              "_id": "66250af5e4e04c09b251e61c"
          },
          {
              "subject_id": "s117",
              "suggestions": "",
              "ratings": [
                  5,
                  5,
                  5,
                  5,
                  5,
                  5,
                  5
              ],
              "_id": "66250af5e4e04c09b251e61d"
          }
      ],
      "date": "2024-04-21T12:47:49.656Z",
      "createdAt": "2024-04-21T12:47:49.673Z",
      "updatedAt": "2024-04-21T12:47:49.673Z",
      "__v": 0
  }
  ]);

  const handleFeedbackChange = (event) => {
    const feedbackId = event.target.value;
    const feedback = feedbackData.find((item) => item.feedback_id === feedbackId);
    setSelectedFeedback(feedback);
  };

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  const printPage = () => {
    window.print();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/feedbackData');
        setFeedbackData(response.data.feedbackData);
      } catch (error) {
        setError('Error fetching feedback data');
      }
      
    };

    fetchData();
  }, []);

  const storePage = () => {
    const pageContent = document.documentElement.outerHTML;
    const blob = new Blob([pageContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'evaluation_page.html';
    link.click();
  };

  const questions = [
    "How clearly the teacher delivered the lecture topics? (Clarity and understandability of teacher's explanation and his full preparation of topic)",
    "Are the lectures delivered by the teacher interactive and interesting?",
    "How do you rate the communication of the teachers? Such as skills include use of chalk, duster, blackboard, LCD, OHP, way of speaking",
    "How do you rate the teacher to answer your questions & solve your difficulties?",
    "How do you rate the speed at which the teacher speaks while delivering the lecture?",
    "How do you rate about teacher regularity and punctuality? (Engage 100% lectures as per the timetable, complete topic in time, punctual to the class)",
    "How do you rate the attitude & behavior of the teacher towards students within & outside the class?"
  ];

  const calculateEvaluationPoint = (feedback) => {
    const ratings = feedback.ratings.flatMap((rating) => rating.ratings);
    const ratingCounts = ratings.reduce((counts, rating) => {
      counts[rating] = (counts[rating] || 0) + 1;
      return counts;
    }, {});

    const poor = ratingCounts[1] || 0;
    const average = ratingCounts[2] || 0;
    const good = ratingCounts[3] || 0;
    const veryGood = ratingCounts[4] || 0;
    const excellent = ratingCounts[5] || 0;
    return poor * 1 + average * 2 + good * 3 + veryGood * 4 + excellent * 5;
  };

  return (
    <div>
      <Head>
        <title>Faculty Evaluation</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <label htmlFor="feedbackSelect" className="block font-bold mb-2">
            Select Feedback:
          </label>
          <select
            id="feedbackSelect"
            value={selectedFeedback?.feedback_id || ''}
            onChange={handleFeedbackChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select Feedback</option>
            {feedbackData.map((feedback) => (
              <option key={feedback.feedback_id} value={feedback.feedback_id}>
                {feedback.feedback_id}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="facultyInput" className="block font-bold mb-2">
            Enter Faculty Name:
          </label>
          <input
            id="facultyInput"
            type="text"
            value={selectedFaculty}
            onChange={handleFacultyChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        {selectedFeedback && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Feedback Id: {selectedFeedback.feedback_id} Faculty Name: {selectedFaculty} Subject: AM-2
            </h2>
            <p className="mb-4">Date of Feedback: 03/01/2024 Total Feedbacks: 69</p>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Que No</th>
                  <th className="px-4 py-2">Question</th>
                  <th className="px-4 py-2">Poor</th>
                  <th className="px-4 py-2">Average</th>
                  <th className="px-4 py-2">Good</th>
                  <th className="px-4 py-2">Very Good</th>
                  <th className="px-4 py-2">Excellent</th>
                  <th className="px-4 py-2">Evaluation Point</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => {
                  const evaluationPoint = calculateEvaluationPoint(selectedFeedback);
                  const ratings = selectedFeedback.ratings.flatMap((rating) => rating.ratings);
                  const ratingCounts = ratings.reduce((counts, rating) => {
                    counts[rating] = (counts[rating] || 0) + 1;
                    return counts;
                  }, {});

                  const poor = ratingCounts[1] || 0;
                  const average = ratingCounts[2] || 0;
                  const good = ratingCounts[3] || 0;
                  const veryGood = ratingCounts[4] || 0;
                  const excellent = ratingCounts[5] || 0;

                  return (
                    <tr key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{question}</td>
                      <td className="border px-4 py-2">{poor}</td>
                      <td className="border px-4 py-2">{average}</td>
                      <td className="border px-4 py-2">{good}</td>
                      <td className="border px-4 py-2">{veryGood}</td>
                      <td className="border px-4 py-2">{excellent}</td>
                      <td className="border px-4 py-2">{evaluationPoint}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7" className="text-right font-bold pr-4">Total</td>
                  <td className="border px-4 py-2">
                    {calculateEvaluationPoint(selectedFeedback)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="7" className="text-right font-bold pr-4">Average</td>
                  <td className="border px-4 py-2">
                    {(
                      calculateEvaluationPoint(selectedFeedback) / selectedFeedback.ratings.length
                    ).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Suggestions</h3>
              <p>Sir you will give the best experience of teaching</p>
              <p>Good understanding</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationPage;
