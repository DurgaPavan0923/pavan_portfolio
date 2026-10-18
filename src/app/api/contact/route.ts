import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators';

const contactRateLimitMap = new Map<string, number[]>();

function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const timestamps = (contactRateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  contactRateLimitMap.set(ip, timestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    if (!checkContactRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit reached. Please wait a few minutes before submitting another message.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid form submission data' },
        { status: 400 }
      );
    }

    const { name, email, subject, message, botcheck } = parsed.data;

    // Honeypot spam check
    if (botcheck && botcheck.trim() !== '') {
      console.warn(`Honeypot triggered by spam bot from IP ${ip}`);
      // Return 200 to trick bot into believing message was sent
      return NextResponse.json({ success: true, message: 'Message recorded' });
    }

    console.log(`[CONTACT INQUIRY] From: ${name} <${email}> | Subject: ${subject}`);
    console.log(`Message: ${message}`);

    // If Resend API key is configured, forward email
    if (process.env.RESEND_API_KEY) {
      try {
        const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'rdpkumar2308@gmail.com';
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Inquiry <onboarding@resend.dev>',
            to: [recipient],
            reply_to: email,
            subject: `[Portfolio] ${subject} - from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });

        if (!resendRes.ok) {
          console.warn('Resend dispatch failed with status:', resendRes.status);
        }
      } catch (err) {
        console.error('Error sending email via Resend:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been delivered directly to Pavan.',
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please email directly at rdpkumar2308@gmail.com.' },
      { status: 500 }
    );
  }
}
