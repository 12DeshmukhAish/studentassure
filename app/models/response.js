import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const responseSchema = new Schema({
    feedback_id: String,
    subject_id: String,
    ratings: {
        type: Object,
        default: {
            Poor: 0,
            Fair: 0,
            Good: 0,
            VeryGood: 0,
            Excellent: 0
        }
    },
    suggestions: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const Response = mongoose.models.Response || model('Response', responseSchema);

export default Response;
