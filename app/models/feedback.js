import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    feedbackTitle: {
      type: String,
      required: true,
    },
    sub: [
      {
        id: {
          type: String,
        },
        subject_name: {
          type: String,
        },
        teacher: {
          type: String,
        },
      },
    ],
    questions: [
      {
        type: String,
        required: true,
      },
    ],
    students: {
      type: Number,
      required: true,
    },
    pwd: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Feedback = mongoose.models.Feedback || model('Feedback', feedbackSchema);

export default Feedback;
