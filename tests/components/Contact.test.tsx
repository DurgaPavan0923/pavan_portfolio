import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from '@/components/sections/Contact';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Contact Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders contact section with form inputs', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Alex Vance/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/alex@company.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/AI\/ML Engineering Role/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Detail your objective/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dispatch Priority Message/i })).toBeInTheDocument();
  });

  it('displays validation errors when submitting an empty form', async () => {
    render(<Contact />);
    const submitBtn = screen.getByRole('button', { name: /Dispatch Priority Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Subject must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits successfully when valid data is entered', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Your inquiry has been delivered directly to Pavan.' }),
    } as Response);

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/Alex Vance/i), {
      target: { value: 'Dr. Bruce Banner' },
    });
    fireEvent.change(screen.getByPlaceholderText(/alex@company.com/i), {
      target: { value: 'banner@avengers.org' },
    });
    fireEvent.change(screen.getByPlaceholderText(/AI\/ML Engineering Role/i), {
      target: { value: 'Senior AI Research Engineer' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Detail your objective/i), {
      target: { value: 'We would love to discuss a RAG architecture position with you.' },
    });

    const submitBtn = screen.getByRole('button', { name: /Dispatch Priority Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Message Dispatched Successfully!/i)).toBeInTheDocument();
    });
  });
});
