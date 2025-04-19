// src/models/users.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  first__name: { type: String, required: true },
  last__name: { type: String, required: true },
  postal_code: { type: String, required: true },
  resume: { type: String, required: true },
  date: { type: String, required: true },
  idType: { type: String, enum: ['national', 'economic'], required: true },
  idNumber: { type: String, required: true },
  full_time_job: { type: Boolean, default: false },
  part_time_job: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);