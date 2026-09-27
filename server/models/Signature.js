/**
 * server/models/Signature.js
 * Pixel guestbook entry: a 16×16 doodle + a short name.
 */

import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true, trim: true, maxlength: 20 },
    // 256 chars, one palette index (0–5) per pixel, row by row
    pixels: { type: String, required: true, match: /^[0-5]{256}$/ },
    ip:     { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Signature || mongoose.model('Signature', signatureSchema);
