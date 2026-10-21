import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Gallery } from '@/components/sections/Gallery';
import { GALLERY_ITEMS } from '@/data/gallery';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

describe('Gallery Component', () => {
  it('renders all 22 moments by default', () => {
    render(<Gallery />);
    expect(screen.getByText(/LIFE & LEADERSHIP IN ACTION/i)).toBeInTheDocument();
    expect(screen.getByText(/22 Documented Moments/i)).toBeInTheDocument();
    expect(screen.getByText('IRA Showcase at Abinya 3.0 / Proxima')).toBeInTheDocument();
  });

  it('filters moments when category button is clicked', () => {
    render(<Gallery />);

    const nccTab = screen.getByRole('button', { name: /NCC & Discipline/i });
    fireEvent.click(nccTab);

    // NCC items should be visible
    expect(screen.getByText('Odisha State Foundation Day Honors')).toBeInTheDocument();
    expect(screen.getByText('CATC 2025 Merit Award')).toBeInTheDocument();

    // Tech item should not be in the filtered list
    expect(screen.queryByText('IRA Showcase at Abinya 3.0 / Proxima')).not.toBeInTheDocument();
  });

  it('opens and closes the lightbox modal when a card is clicked', () => {
    render(<Gallery />);

    const card = screen.getByLabelText(/View photo: IRA Showcase at Abinya 3.0 \/ Proxima/i);
    fireEvent.click(card);

    // Modal dialog should now be present
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/Close dialog/i)).toBeInTheDocument();

    // Close the modal
    const closeBtn = screen.getByLabelText(/Close dialog/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
