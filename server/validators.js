/**
 * server/validators.js
 * Input sanitisation and validation for the contact form.
 */

import validator from 'validator';

// Characters that are never legitimate in a name or project description
const HTML_TAGS_RE = /<[^>]*>/g;

/**
 * Strip HTML tags and trim whitespace.
 * @param {string} str
 */
function sanitise(str) {
  if (typeof str !== 'string') return '';
  return str.replace(HTML_TAGS_RE, '').trim();
}

/**
 * Validate and sanitise contact form body.
 *
 * @param {{ name?: any, email?: any, project?: any }} body
 * @returns {{ valid: boolean, errors: string[], data: { name, email, project } }}
 */
export function validateContact(body) {
  const errors = [];

  const name    = sanitise(body?.name    ?? '');
  const email   = sanitise(body?.email   ?? '');
  const project = sanitise(body?.project ?? '');

  // ── Name ──
  if (!name) {
    errors.push('Name is required.');
  } else if (name.length < 2) {
    errors.push('Name must be at least 2 characters.');
  } else if (name.length > 100) {
    errors.push('Name must be under 100 characters.');
  }

  // ── Email ──
  if (!email) {
    errors.push('Email is required.');
  } else if (!validator.isEmail(email)) {
    errors.push('Please enter a valid email address.');
  } else if (email.length > 254) {
    errors.push('Email address is too long.');
  }

  // ── Project / Message ──
  if (!project) {
    errors.push('Project description is required.');
  } else if (project.length < 10) {
    errors.push('Please give a bit more detail (at least 10 characters).');
  } else if (project.length > 3000) {
    errors.push('Project description must be under 3000 characters.');
  }

  return {
    valid: errors.length === 0,
    errors,
    data: { name, email, project },
  };
}
