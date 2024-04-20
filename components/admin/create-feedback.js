"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FeedbackForm = () => {
    const [subType, setSubType] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [formData, setFormData] = useState({
    feedbackTitle: '2023-2024 ENTC SY SEM2',
    subjects: [{ subject: '', faculty: '',_id:'' }],
    questions: [''], 
    students: '',
    pwd: '',
    isActive: false, // Default value for isActive
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('subject')) {
      const newSubjects = [...formData.subjects];
      newSubjects[index].subject = value;
      setFormData({ ...formData, subjects: newSubjects });
    } else if (name.startsWith('faculty')) {
      const newSubjects = [...formData.subjects];
      newSubjects[index].faculty = value;
      setFormData({ ...formData, subjects: newSubjects });
    } else if (name.startsWith('_id')) {
        const newSubjects = [...formData.subjects];
        newSubjects[index]._id = value;
        setFormData({ ...formData, subjects: newSubjects });
    } else if (name.startsWith('question')) {
      const newQuestions = [...formData.questions];
      newQuestions[index] = value;
      setFormData({ ...formData, questions: newQuestions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { subject: '', faculty: '' ,_id:''}],
    });
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
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
      await axios.post('/api/feedback', formData);
      setSubmitted(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-[90%]">
        <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <Select defaultValue={feedbackType} onValueChange={(value) => setFeedbackType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>Select a Feedback type</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="event">External</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
            <label htmlFor="feedbackTitle" className="block mb-2">Feedback Title:</label>
            <Input
              type="text"
              id="feedbackTitle"
              name="feedbackTitle"
              value={formData.feedbackTitle}
              onChange={(e) => setFormData({ ...formData, feedbackTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter feedback title"
            />
          </div>
        {feedbackType === 'academic' && (
          <div className="mb-4">
            <Select defaultValue={subType} onValueChange={(value) => setSubType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>Select a sub type</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theory">Theory</SelectItem>
                <SelectItem value="practical">Practical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {feedbackType === 'academic' && formData.subjects.map((subject, index) => (
          <div className="mb-4 flex gap-4" key={index}>
            <label htmlFor={`subject${index}`} className="block mb-2">Subject {index + 1}:</label>
            <div className="flex  mb-2">
              <Input
                type="text"
                id={`subject${index}`}
                name={`subject${index}`}
                value={subject.subject}
                onChange={(e) => handleChange(e, index)}
                className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mr-2"
                placeholder="Enter subject"
              />
              <Input
                type="text"
                id={`faculty${index}`}
                name={`faculty${index}`}
                value={subject.faculty}
                onChange={(e) => handleChange(e, index)}
                className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter faculty"
              />
               <Input
                type="text"
                id={`_id${index}`}
                name={`_id${index}`}
                value={subject._id}
                onChange={(e) => handleChange(e, index)}
                className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mr-2"
                placeholder="Enter Course Code"
              />
            </div>
            <Button onClick={() => handleRemoveSubject(index)}>
              Remove Subject
            </Button>
          </div>
        ))}
        {feedbackType === 'academic' && (
          <Button onClick={handleAddSubject}>
            Add Subject
          </Button>
        )}
        {feedbackType === 'academic' && formData.questions.map((question, index) => (
          <div className="mb-4" key={index}>
            <label htmlFor={`question${index}`} className="block mb-2">Question {index + 1}:</label>
            <div className="flex">
              <Input
                type="text"
                id={`question${index}`}
                name={`question${index}`}
                value={question}
                onChange={(e) => handleChange(e, index)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter question"
              />
              <Button onClick={() => handleRemoveQuestion(index)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        {feedbackType === 'academic' && (
          <Button onClick={handleAddQuestion}>
            Add Question
          </Button>
        )}
       
          
    
        <div className="mb-4">
          <label htmlFor="students" className="block mb-2">Number of Students:</label>
          <Input
            type="number"
            id="students"
            name="students"
            value={formData.students}
            onChange={(e) => setFormData({ ...formData, students: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter number of students"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pwd" className="block mb-2">Password:</label>
          <Input
            type="password"
            id="pwd"
            name="pwd"
            value={formData.pwd}
            onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
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
        <Button type="submit">
          Submit Feedback
        </Button>
        {submitted && (
          <p className="mt-4 text-green-600">Feedback submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
