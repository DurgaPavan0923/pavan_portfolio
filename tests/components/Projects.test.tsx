import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from '@/components/sections/Projects';

describe('Projects Component', () => {
  it('renders all projects by default', () => {
    render(<Projects />);
    expect(screen.getByText('Production AI Applications &')).toBeInTheDocument();
    expect(screen.getByText('FactLens AI')).toBeInTheDocument();
    expect(screen.getByText(/InsightAI/)).toBeInTheDocument();
  });

  it('filters projects when a category button is clicked', () => {
    render(<Projects />);
    
    // Filter by NLP
    const nlpButton = screen.getByRole('button', { name: /NLP/i });
    fireEvent.click(nlpButton);

    // Filter button becomes active
    expect(nlpButton).toHaveClass('font-bold');
  });

  it('renders view case study buttons for featured projects', () => {
    render(<Projects />);
    const caseStudyButtons = screen.getAllByRole('button', { name: /view case study/i });
    expect(caseStudyButtons.length).toBeGreaterThan(0);
  });
});
