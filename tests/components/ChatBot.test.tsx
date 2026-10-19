import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatBot } from '@/components/ai/ChatBot';

describe('ChatBot Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial assistant greeting when opened', () => {
    render(<ChatBot isOpen={true} onToggle={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText(/Hi! I'm Pavan's Neural Assistant/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask anything about Pavan/i)).toBeInTheDocument();
  });

  it('renders suggested prompts', () => {
    render(<ChatBot isOpen={true} onToggle={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('What AI projects has Pavan built?')).toBeInTheDocument();
    expect(screen.getByText('What is FactLens AI?')).toBeInTheDocument();
  });

  it('sends user message and handles graceful offline fallback if API fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<ChatBot isOpen={true} onToggle={vi.fn()} onClose={vi.fn()} />);

    const input = screen.getByPlaceholderText(/Ask anything about Pavan/i);
    fireEvent.change(input, { target: { value: 'What are your certifications?' } });

    const sendBtn = screen.getByRole('button', { name: /Send query/i });
    fireEvent.click(sendBtn);

    // User message should appear immediately
    expect(screen.getByText('What are your certifications?')).toBeInTheDocument();

    // After failure, fallback assistant response should appear
    await waitFor(() => {
      expect(screen.getByText(/offline portfolio mode/i)).toBeInTheDocument();
    });
  });

  it('clears conversation when clear button is clicked', async () => {
    render(<ChatBot isOpen={true} onToggle={vi.fn()} onClose={vi.fn()} />);

    const input = screen.getByPlaceholderText(/Ask anything about Pavan/i);
    fireEvent.change(input, { target: { value: 'Test query' } });
    const sendBtn = screen.getByRole('button', { name: /Send query/i });
    fireEvent.click(sendBtn);

    expect(screen.getByText('Test query')).toBeInTheDocument();

    const clearBtn = screen.getByRole('button', { name: /Clear chat history/i });
    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(screen.queryByText('Test query')).not.toBeInTheDocument();
      expect(screen.getByText(/Hi! I'm Pavan's Neural Assistant/i)).toBeInTheDocument();
    });
  });
});
