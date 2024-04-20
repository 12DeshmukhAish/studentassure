import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const registerSchema = new Schema(
  {
   
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
    
   
    username: {
        type: String,
        required: true,
      },
    password: [
      {
        type: String,
        required: true,
      }
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Register = mongoose.models.Register || model('Register', registerSchema);

export default Register;
