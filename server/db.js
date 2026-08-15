/**
 * server/db.js
 * MongoDB connection via Mongoose with graceful reconnect handling.
 */

import mongoose from 'mongoose';

let isConnected = false;

/**
 * connectDB — reuses an existing connection so serverless invocations
 * don't open a new connection on every request.
 */
export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  try {
    await mongoose.connect(uri, {
      // Mongoose 8+ no longer needs these options, but kept for clarity
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    });

    isConnected = true;
    console.log('✅  MongoDB connected');
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    throw err;
  }
}

export default mongoose;
