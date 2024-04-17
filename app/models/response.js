import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const responseSchema = new Schema({
    "feedback_id": "String",
    "feedbacks": [
        {
            "subject_id": "String",
            "responses": [
                {
                    "question": "String",
                    "rating": "String",
                    "suggestions": ["String"]
                }
            ],
            "date": "Date"
        }
    ]
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const Response = mongoose.models.Response || model('Response', responseSchema);

export default Response;
