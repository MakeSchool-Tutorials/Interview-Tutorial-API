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
    ref: 'user',
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('question', QuestionSchema);
