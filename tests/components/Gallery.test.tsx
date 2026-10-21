import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Gallery } from '@/components/sections/Gallery';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

describe('Gallery Component', () => {
  it('renders section and photo moments', () => {
    render(<Gallery />);
    expect(screen.getByText(/LIFE & LEADERSHIP IN ACTION/i)).toBeInTheDocument();
    expect(screen.getAllByText('IRA Showcase at Abinya 3.0 / Proxima').length).toBeGreaterThan(0);
  });

  it('provides manual left and right scroll navigation buttons', () => {
    render(<Gallery />);
    const leftBtn = screen.getByLabelText(/Scroll moments left/i);
    const rightBtn = screen.getByLabelText(/Scroll moments right/i);
    expect(leftBtn).toBeInTheDocument();
    expect(rightBtn).toBeInTheDocument();
    fireEvent.click(rightBtn);
    fireEvent.click(leftBtn);
  });

  it('opens and closes the lightbox modal when a card is clicked', () => {
    render(<Gallery />);

    const cards = screen.getAllByLabelText(/View photograph: IRA Showcase at Abinya 3.0 \/ Proxima/i);
    fireEvent.click(cards[0]);

    // Modal dialog should now be present
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/Close dialog/i)).toBeInTheDocument();

    // Close the modal
    const closeBtn = screen.getByLabelText(/Close dialog/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
