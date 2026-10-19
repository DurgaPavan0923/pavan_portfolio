import { describe, it, expect } from 'vitest';
import { contactFormSchema, chatRequestSchema } from '@/lib/validators';

describe('contactFormSchema', () => {
  it('validates a correct contact submission', () => {
    const validData = {
      name: 'Dr. Jane Smith',
      email: 'jane.smith@mit.edu',
      subject: 'Research Collaboration Opportunity',
      message: 'Hello Pavan, I saw your FactLens AI project and would love to discuss a research collaboration.',
      botcheck: '',
    };
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails when email is invalid', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'not-an-email',
      subject: 'Interview',
      message: 'Let us connect for an AI/ML engineering role at our company.',
      botcheck: '',
    };
    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('valid email address');
    }
  });

  it('fails when message is too short (<10 chars)', () => {
    const shortMessage = {
      name: 'Recruiter',
      email: 'recruiter@tech.com',
      subject: 'Hello',
      message: 'Hi',
      botcheck: '',
    };
    const result = contactFormSchema.safeParse(shortMessage);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 10 characters');
    }
  });

  it('fails when name is too short (<2 chars)', () => {
    const shortName = {
      name: 'A',
      email: 'recruiter@tech.com',
      subject: 'Job Offer',
      message: 'We are very interested in your graph RAG profile.',
      botcheck: '',
    };
    const result = contactFormSchema.safeParse(shortName);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 2 characters');
    }
  });

  it('fails when honeypot botcheck contains text', () => {
    const botData = {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      subject: 'SEO Services',
      message: 'Buy our high quality crypto SEO links right now for your website!',
      botcheck: 'I am a bot filling hidden fields',
    };
    const result = contactFormSchema.safeParse(botData);
    expect(result.success).toBe(false);
  });
});

describe('chatRequestSchema', () => {
  it('validates a valid chat request', () => {
    const validChat = {
      message: 'What is Pavan’s experience with Graph RAG and Neo4j?',
      history: [
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: 'Hello! How can I help you today?' },
      ],
    };
    const result = chatRequestSchema.safeParse(validChat);
    expect(result.success).toBe(true);
  });

  it('fails on empty message', () => {
    const emptyChat = {
      message: '',
    };
    const result = chatRequestSchema.safeParse(emptyChat);
    expect(result.success).toBe(false);
  });

  it('fails when message exceeds 1000 characters', () => {
    const oversizedChat = {
      message: 'A'.repeat(1001),
    };
    const result = chatRequestSchema.safeParse(oversizedChat);
    expect(result.success).toBe(false);
  });

  it('fails when history exceeds 20 turns', () => {
    const longHistory = Array.from({ length: 21 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `Turn ${i}`,
    }));
    const result = chatRequestSchema.safeParse({
      message: 'Next question',
      history: longHistory,
    });
    expect(result.success).toBe(false);
  });
});
