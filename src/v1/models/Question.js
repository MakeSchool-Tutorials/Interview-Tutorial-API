import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  companyLocation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  jobRole: {
    type: String,
    required: true,
  },
  tags: [String],
},
{
  timestamps: {
    createdAt: 'created_at',
  },
});

module.exports = mongoose.model('question', QuestionSchema);
