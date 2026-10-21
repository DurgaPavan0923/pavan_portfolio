import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Projects } from '@/components/sections/Projects';

describe('Projects Component', () => {
  it('renders projects and tech stack', () => {
    render(<Projects />);
    expect(screen.getByText('Production AI Applications &')).toBeInTheDocument();
    expect(screen.getByText('FactLens AI')).toBeInTheDocument();
    expect(screen.getByText(/InsightAI/)).toBeInTheDocument();
  });

  it('renders case study buttons for featured projects and opens modal on click', () => {
    render(<Projects />);
    const caseStudyButtons = screen.getAllByRole('button', { name: /Case Study/i });
    expect(caseStudyButtons.length).toBeGreaterThan(0);

    // Open first case study modal
    fireEvent.click(caseStudyButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByLabelText(/Close dialog/i);
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
