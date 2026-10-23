import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Projects } from '@/components/sections/Projects';

describe('Projects Component', () => {
  it('renders projects and tech stack', () => {
    render(<Projects />);
    expect(screen.getByText('Evaluated AI Systems &')).toBeInTheDocument();
    expect(screen.getByText('FactLens AI')).toBeInTheDocument();
    expect(screen.getByText(/InsightAI/)).toBeInTheDocument();
  });

  it('renders detailed architecture buttons for featured projects and opens modal on click', () => {
    render(<Projects />);
    const architectureButtons = screen.getAllByRole('button', { name: /Detailed Architecture/i });
    expect(architectureButtons.length).toBeGreaterThan(0);

    // Open first architecture modal
    fireEvent.click(architectureButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByLabelText(/Close dialog/i);
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
