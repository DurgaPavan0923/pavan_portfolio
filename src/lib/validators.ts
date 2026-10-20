import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name must be at most 80 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(120, 'Subject must be at most 120 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000, 'Message must be at most 3000 characters'),
  botcheck: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
  timestamp: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const chatRequestSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message exceeds 1,000 characters'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string().max(2000),
      })
    )
    .max(20, 'History length exceeded')
    .optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
