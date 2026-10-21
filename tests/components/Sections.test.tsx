import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhyWorkWithMe } from '@/components/sections/WhyWorkWithMe';
import { PersonalClosing } from '@/components/sections/PersonalClosing';

describe('WhyWorkWithMe Component', () => {
  it('renders bento cards with core value propositions', () => {
    render(<WhyWorkWithMe />);

    expect(screen.getByRole('heading', { name: /Why Work With Me/i })).toBeDefined();
    expect(screen.getByText(/RAG & Graph RAG Engineering/i)).toBeDefined();
    expect(screen.getByText(/Dual-Cloud Certified/i)).toBeDefined();
    expect(screen.getByText(/100\+ Member Leadership/i)).toBeDefined();
    expect(screen.getByText(/Full-Stack AI Product Delivery/i)).toBeDefined();
    expect(screen.getByText(/Neo4j Certified Professional/i)).toBeDefined();
  });

  it('renders tech marquee strip', () => {
    render(<WhyWorkWithMe />);
    expect(screen.getByText(/CORE PRODUCTION STACK/i)).toBeDefined();
    const pythonBadges = screen.getAllByText('Python');
    expect(pythonBadges.length).toBeGreaterThan(0);
  });
});

describe('PersonalClosing Component', () => {
  it('renders thank you message and contact links', () => {
    render(<PersonalClosing />);

    expect(screen.getByRole('heading', { name: /Let’s Build Something Exceptional Together/i })).toBeDefined();
    expect(screen.getByText(/rdpkumar2308@gmail\.com/i)).toBeDefined();
    expect(screen.getByText(/rajana-durga-pavan-kumar/i)).toBeDefined();
    expect(screen.getByText(/@DurgaPavan0923/i)).toBeDefined();
  });

  it('copies email to clipboard on copy button click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<PersonalClosing />);
    const copyButton = screen.getByRole('button', { name: /copy email address/i });
    fireEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledWith('rdpkumar2308@gmail.com');
  });
});
