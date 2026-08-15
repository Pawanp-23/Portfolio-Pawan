/**
 * server/mailer.js
 * Nodemailer transporter + email helper functions.
 *
 * Using Gmail SMTP with App Password.
 * To generate an App Password:
 *   1. Enable 2-Step Verification on your Google account
 *   2. Go to https://myaccount.google.com/apppasswords
 *   3. Generate a password for "Mail" and paste it into SMTP_PASS in .env
 */

import { createTransport } from 'nodemailer';

// ── Transporter ───────────────────────────────────────────────────────────────

function createTransporter() {
  return createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false, // true for port 465, false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── Owner Notification ────────────────────────────────────────────────────────

/**
 * Send a notification email to the portfolio owner when a new
 * contact form submission arrives.
 *
 * @param {Object} submission — Mongoose document
 */
export async function sendNewSubmissionEmail(submission) {
  const transporter = createTransporter();
  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  const date = new Date(submission.createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  await transporter.sendMail({
    from: `"Portfolio Bot" <${process.env.SMTP_USER}>`,
    to,
    subject: `📬 New message from ${submission.name} — Portfolio Contact`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="margin:0;padding:0;background:#f1f0ee;font-family:'Helvetica Neue',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr><td>
            <table width="600" align="center" cellpadding="0" cellspacing="0"
              style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e6e5e2;max-width:600px;">
              <!-- Header -->
              <tr>
                <td style="background:#0a0a0a;padding:28px 32px;">
                  <p style="margin:0;font-size:22px;font-weight:600;color:#fff;">
                    ✦ Pawan <span style="color:#cf8047;">·</span> New Message
                  </p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:32px;">
                  <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#8d8d8d;">
                    Received on ${date}
                  </p>
                  <hr style="border:none;border-top:1px solid #e6e5e2;margin:16px 0 24px;">

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-bottom:20px;">
                        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#8d8d8d;">Name</p>
                        <p style="margin:0;font-size:16px;font-weight:600;color:#111;">${submission.name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom:20px;">
                        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#8d8d8d;">Email</p>
                        <p style="margin:0;font-size:16px;color:#111;">
                          <a href="mailto:${submission.email}" style="color:#b15f2c;text-decoration:none;">${submission.email}</a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#8d8d8d;">Project / Message</p>
                        <p style="margin:0;font-size:15px;color:#111;line-height:1.6;white-space:pre-wrap;">${submission.project}</p>
                      </td>
                    </tr>
                  </table>

                  <hr style="border:none;border-top:1px solid #e6e5e2;margin:28px 0 20px;">
                  <a href="mailto:${submission.email}?subject=Re: Your message on pawanpatil.dev"
                    style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;font-size:14px;
                           font-weight:500;padding:12px 24px;border-radius:9999px;">
                    Reply to ${submission.name} →
                  </a>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding:16px 32px;background:#f1f0ee;border-top:1px solid #e6e5e2;">
                  <p style="margin:0;font-size:11px;color:#8d8d8d;">
                    IP: ${submission.ip || 'unknown'} · Submission ID: ${submission._id}
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ── Auto-Reply to Visitor ─────────────────────────────────────────────────────

/**
 * Send a confirmation auto-reply to the person who submitted the form.
 *
 * @param {Object} submission — Mongoose document
 */
export async function sendAutoReply(submission) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Pawan Patil" <${process.env.SMTP_USER}>`,
    to: submission.email,
    subject: `Got your message, ${submission.name.split(' ')[0]} — I'll be in touch`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="margin:0;padding:0;background:#f1f0ee;font-family:'Helvetica Neue',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr><td>
            <table width="600" align="center" cellpadding="0" cellspacing="0"
              style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e6e5e2;max-width:600px;">
              <!-- Header -->
              <tr>
                <td style="background:#0a0a0a;padding:28px 32px;">
                  <p style="margin:0;font-size:22px;font-weight:600;color:#fff;">
                    ✦ Pawan <span style="color:#cf8047;">Patil</span>
                  </p>
                  <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,.5);">AI Product Builder & Developer</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:32px;">
                  <p style="margin:0 0 16px;font-size:17px;color:#111;line-height:1.5;">
                    Hi <strong>${submission.name.split(' ')[0]}</strong>,
                  </p>
                  <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
                    Thanks for reaching out! I received your message and will get back to you
                    as soon as possible — usually within 24–48 hours.
                  </p>
                  <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7;">
                    If your matter is urgent, feel free to reply directly to this email.
                  </p>

                  <!-- Quote back their message -->
                  <div style="background:#f1f0ee;border-left:3px solid #b15f2c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#8d8d8d;">Your message</p>
                    <p style="margin:0;font-size:14px;color:#444;line-height:1.6;white-space:pre-wrap;">${submission.project}</p>
                  </div>

                  <p style="margin:0;font-size:15px;color:#111;">
                    Talk soon,<br>
                    <strong>Pawan Patil</strong>
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding:16px 32px;background:#f1f0ee;border-top:1px solid #e6e5e2;">
                  <p style="margin:0;font-size:11px;color:#8d8d8d;">
                    This is an automated confirmation. Please do not reply to this message directly
                    — instead, reply to the original email or reach out at ${process.env.SMTP_USER}.
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}
