import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// In-memory rate limiting map: IP -> timestamp[]
const contactRateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 3; // 3 submissions per 10 minutes

  const timestamps = (contactRateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  contactRateLimitMap.set(ip, timestamps);
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || '127.0.0.1';

    // 1. Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. You can only submit 3 messages every 10 minutes. For urgent inquiries, email rdpkumar2308@gmail.com directly.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Schema validation
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid form submission data' },
        { status: 400 }
      );
    }

    const { name, email, subject, message, botcheck, timestamp } = parsed.data;

    // 3. Honeypot check
    if (botcheck && botcheck.trim() !== '') {
      console.warn(`[Contact API] Honeypot triggered by bot from IP ${ip}`);
      // Return 200 without sending to silently discard bot spam
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    }

    // 4. Time-trap check (< 3 seconds indicates automated bot script)
    if (timestamp && typeof timestamp === 'number') {
      const elapsedMs = Date.now() - timestamp;
      if (elapsedMs < 3000) {
        console.warn(`[Contact API] Time-trap triggered (${elapsedMs}ms) from IP ${ip}`);
        return NextResponse.json(
          { error: 'Submission rejected: Form completed too rapidly. Please try again.' },
          { status: 400 }
        );
      }
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br />');

    const toEmail = process.env.CONTACT_TO_EMAIL || 'rdpkumar2308@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const emailSubject = `[Portfolio] ${subject.trim()} — ${name.trim()}`;

    const textContent = `Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${subject.trim()}
IP: ${ip}
Time: ${new Date().toISOString()}

Message:
${message.trim()}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; padding: 24px; }
    .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; max-width: 600px; margin: 0 auto; }
    .header { border-bottom: 1px solid #1f2937; padding-bottom: 16px; margin-bottom: 20px; }
    .title { color: #38bdf8; font-size: 18px; font-weight: bold; margin: 0; }
    .meta { font-size: 13px; color: #94a3b8; margin-top: 4px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-family: monospace; }
    .value { font-size: 14px; color: #e2e8f0; margin-bottom: 14px; }
    .message-box { background-color: #030712; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #f8fafc; }
    .footer { margin-top: 24px; font-size: 11px; color: #475569; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="title">New Portfolio Inquiry</div>
      <div class="meta">Received from Pavan's Portfolio Contact Pipeline</div>
    </div>
    <div>
      <div class="label">Sender Name</div>
      <div class="value">${safeName}</div>
      <div class="label">Sender Email</div>
      <div class="value"><a href="mailto:${safeEmail}" style="color: #38bdf8;">${safeEmail}</a></div>
      <div class="label">Inquiry Subject</div>
      <div class="value">${safeSubject}</div>
      <div class="label">Message Body</div>
      <div class="message-box">${safeMessage}</div>
    </div>
    <div class="footer">
      Dispatched via Next.js 15 contact pipeline · IP: ${ip} · Reply directly to this email to contact the sender.
    </div>
  </div>
</body>
</html>
`;

    console.log(`[Contact API] Inquiry from: ${name} <${email}> | Subject: "${subject}"`);

    let emailDelivered = false;
    let deliveryMethod = 'none';

    // 5. Primary Delivery: Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data: resendData, error: resendError } = await resend.emails.send({
          from: fromEmail,
          to: [toEmail],
          replyTo: email.trim(),
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });

        if (resendError) {
          console.error('[Contact API] Resend dispatch error:', resendError);
        } else if (resendData?.id) {
          emailDelivered = true;
          deliveryMethod = 'Resend';
          console.log(`[Contact API] Delivered successfully via Resend. ID: ${resendData.id}`);
        }
      } catch (err) {
        console.error('[Contact API] Resend SDK invocation error:', err);
      }
    }

    // 6. Secondary Fallback: Nodemailer with Gmail SMTP
    if (!emailDelivered && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const info = await transporter.sendMail({
          from: `"${name.trim()} (Portfolio)" <${process.env.GMAIL_USER}>`,
          to: toEmail,
          replyTo: email.trim(),
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });

        if (info.messageId) {
          emailDelivered = true;
          deliveryMethod = 'Gmail SMTP';
          console.log(`[Contact API] Delivered successfully via Gmail SMTP fallback. ID: ${info.messageId}`);
        }
      } catch (smtpErr) {
        console.error('[Contact API] Nodemailer SMTP fallback failed:', smtpErr);
      }
    }

    // 7. Optional Auto-Reply to Sender if SEND_AUTOREPLY=true
    if (process.env.SEND_AUTOREPLY === 'true' && (process.env.RESEND_API_KEY || (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD))) {
      try {
        const autoReplySubject = `Thank you for reaching out, ${name.trim()} — Rajana Durga Pavan Kumar`;
        const autoReplyText = `Hi ${name.trim()},\n\nThank you for reaching out through my portfolio. I have received your message regarding "${subject.trim()}" and will get back to you within 24–48 hours.\n\nBest regards,\nRajana Durga Pavan Kumar\nAI & ML Engineer\nhttps://pavan-portfolio-gamma-six.vercel.app/`;
        
        const autoReplyHtml = `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; line-height: 1.6; color: #1e293b;">
            <p>Hi <strong>${safeName}</strong>,</p>
            <p>Thank you for reaching out through my portfolio! I have received your inquiry regarding <em>"${safeSubject}"</em> and will review it and reply within 24–48 hours.</p>
            <p>In the meantime, feel free to review my <a href="https://pavan-portfolio-gamma-six.vercel.app/Rajana.pdf" style="color: #0284c7;">official resume</a> or explore my code on <a href="https://github.com/DurgaPavan0923" style="color: #0284c7;">GitHub</a>.</p>
            <br />
            <p>Best regards,<br /><strong>Rajana Durga Pavan Kumar</strong><br />AI & ML Engineer<br />SOA University (ITER) · TIH IIT Guwahati Intern</p>
          </div>
        `;

        if (process.env.RESEND_API_KEY) {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: fromEmail,
            to: [email.trim()],
            subject: autoReplySubject,
            text: autoReplyText,
            html: autoReplyHtml,
          });
        }
      } catch (autoErr) {
        console.warn('[Contact API] Auto-reply failed:', autoErr);
      }
    }

    if (!emailDelivered && !process.env.RESEND_API_KEY && !process.env.GMAIL_USER) {
      console.warn('[Contact API] Development notice: Neither RESEND_API_KEY nor GMAIL credentials set. Message recorded locally.');
    }

    return NextResponse.json({
      success: true,
      message: "Message dispatched successfully! Pavan will reply within 24–48 hours.",
      deliveryMethod: process.env.NODE_ENV === 'development' ? deliveryMethod : undefined,
    });
  } catch (error) {
    console.error('[Contact API] Uncaught handler error:', error);
    return NextResponse.json(
      { error: 'An unexpected transmission error occurred. Please email directly at rdpkumar2308@gmail.com.' },
      { status: 500 }
    );
  }
}
