import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { chatRequestSchema } from '@/lib/validators';
import { buildSystemPrompt, getOfflineFallbackResponse } from '@/lib/gemini';

// Simple in-memory sliding-window rate limiter: IP -> timestamps
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 20;

  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before sending another prompt.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid chat request' },
        { status: 400 }
      );
    }

    const { message, history } = parsed.data;

    // Defense against direct prompt injection and system prompt leak attempts
    const lowerMessage = message.toLowerCase();
    if (
      lowerMessage.includes('ignore previous instructions') ||
      lowerMessage.includes('system prompt') ||
      lowerMessage.includes('reveal prompt') ||
      lowerMessage.includes('jailbreak') ||
      lowerMessage.includes('developer mode')
    ) {
      return new Response(
        "I am the Neural Assistant for Rajana Durga Pavan Kumar. I operate exclusively to answer verified questions about Pavan's AI/ML projects, technical toolkit, experience, and certifications. How can I assist you with Pavan's portfolio?",
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    if (!apiKey) {
      // Offline fallback generator
      const reply = getOfflineFallbackResponse(message);
      return new Response(reply, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // Call Gemini API with streaming and graceful fallback on model deprecation
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: buildSystemPrompt(),
      });

      const formattedHistory = (history || []).map((h) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      }));

      const chat = model.startChat({
        history: formattedHistory,
      });

      const streamResult = await chat.sendMessageStream(message);

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamResult.stream) {
              const chunkText = chunk.text();
              controller.enqueue(encoder.encode(chunkText));
            }
          } catch (streamErr) {
            console.error('Error during streaming chunk:', streamErr);
            controller.enqueue(encoder.encode(getOfflineFallbackResponse(message)));
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    } catch (apiError: unknown) {
      console.warn(`Gemini API error with model ${modelName}, using fallback:`, apiError);
      const reply = getOfflineFallbackResponse(message);
      return new Response(reply, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return new Response(
      "I encountered a momentary connection hiccup. Pavan is an AI/ML Engineer specializing in Retrieval-Augmented Generation (RAG) and cloud systems. Feel free to explore his projects above or email him directly at rdpkumar2308@gmail.com.",
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }
}
