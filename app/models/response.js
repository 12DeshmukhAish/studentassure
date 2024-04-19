import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ratingSchema = new Schema({
    question_id: String,
    rate: Number
});

const responseSchema = new Schema({
    feedback_id: String,
    ratings: [{
        subject_id: String,
        suggestions: String,
        rating: [ratingSchema] // Using ratingSchema for nested ratings
    }],
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const Response = mongoose.models.Response || model('Response', responseSchema);

export default Response;
