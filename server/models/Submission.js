/**
 * server/models/Submission.js
 * Mongoose model for contact form submissions.
 */

import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be under 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email must be under 254 characters'],
    },
    project: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [3000, 'Project description must be under 3000 characters'],
    },
    // Metadata for spam detection & debugging
    ip: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    // Tracks whether the notification email was sent successfully
    notified: {
      type: Boolean,
      default: false,
    },
    // Tracks whether an auto-reply was sent to the submitter
    autoReplySent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    collection: 'submissions',
  }
);

// Index on email and createdAt for fast queries and rate-limiting lookups
submissionSchema.index({ email: 1, createdAt: -1 });
submissionSchema.index({ ip: 1, createdAt: -1 });

const Submission =
  mongoose.models.Submission ||
  mongoose.model('Submission', submissionSchema);

export default Submission;
