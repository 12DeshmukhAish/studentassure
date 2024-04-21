import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    feedbackTitle: {
      type: String,
      required: true,
    },
    subjects: [
      {
       
        _id: {
          type: String,
        },
        subject: {
          type: String,
        },
        faculty: {
          type: String,
        },
      },
    ],
    questions: [
       {
          type: String,
          required: true,
       }
    ],
    students: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
      enum: ['CSE', 'First Year', 'ENTC', 'Electrial', 'Civil', 'Mechanical'], // Replace with your department options
    },
    class: {
      type: String,
      required: true,
      enum: ['FY', 'SY', 'TY', 'Final Year'], // Replace with your class options
    },
    feedbackType: {
      type: String,
      required: true,
      enum: ['Theory', 'Practical'], // Replace with your feedback type options
    },
    pwd: {
      type: String,
      required: true,
    },
    
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Feedback = mongoose.models.Feedback || model('Feedback', feedbackSchema);

export default Feedback;
